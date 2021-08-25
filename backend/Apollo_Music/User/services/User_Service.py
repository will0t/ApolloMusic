from User.models.User_Model import User

def get_user_info_service(user_id):
    user = User.objects.get(id = user_id)
    return {
        "uid":user.id,
        "username":user.name,
        "email":user.email
    }

from  rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'id']
        extra_kwargs = {
            'url': {'view_name': 'user', 'lookup_field': 'id'},
            'owner': {'lookup_field': 'id'}
        }

