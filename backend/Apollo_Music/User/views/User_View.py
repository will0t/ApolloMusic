from django.db import transaction
from django.http import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from requests import Response
from rest_framework import viewsets, status

from rest_framework.decorators import api_view, parser_classes
from rest_framework.generics import GenericAPIView
from rest_framework.parsers import FormParser
from rest_framework.views import APIView

from User.models import User
from User.schema_view import DocParam
from User.services.User_Service import get_user_info_service, UserSerializer


@api_view(["GET"])
@swagger_auto_schema(
    operation_summary='我是 GET 的摘要',
    manual_parameters=[
        openapi.Parameter(
            name='id',
            in_=openapi.IN_QUERY,
            description='user_id',
            type=openapi.TYPE_INTEGER
        )
    ],
)
def get_user_info_view(self,request,id):
    id = request.query_params.get('id')
    result = get_user_info_service(id)
    return JsonResponse(result, safe=False)

class UserViewSet(viewsets.ModelViewSet):
    '''
        retrieve:
            Return a user instance.

        list:
            Return all users,ordered by most recent joined.

        create:
            Create a new user.

        delete:
            Remove a existing user.

        partial_update:
            Update one or more fields on a existing user.

        update:
            Update a user.
    '''
    queryset = User.objects.all()   # 将User的所有对象赋给queryset，并返回对应值
    serializer_class = UserSerializer   # 指向UserSerializer

class UsersView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get(self, request, *args, **krgs):
        users = self.get_queryset()
        serializer = self.serializer_class(users, many=True)
        data = serializer.data
        return JsonResponse(data, safe=False)
    def post(self, request, *args, **krgs):
        data = request.data
        try:
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
            with transaction.atomic():
                serializer.save()
            data = serializer.data
        except Exception as e:
            data = {'error': str(e)}
        return JsonResponse(data)
class CustomView(GenericAPIView):
    """
    param1 -- A first parameter
    param2 -- A second parameter
    """
    coreapi_fields = (
        DocParam(name="id",location='query',description='测试接口'),
        DocParam(name="AUTHORIZATION", location='header', description='token'),
    )

    def post(self, request):
        print(request.query_params.get('id'));
        return JsonResponse({'message':'成功！'})

@api_view(['POST'])
def save_medical(request):
    id = request.POST.get('name')

    try:
        User.objects.create(id= id)
        return Response("Data Saved!", status=status.HTTP_201_CREATED)

    except Exception as ex:
        return Response(ex, status=status.HTTP_400_BAD_REQUEST)
