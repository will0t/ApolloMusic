#!/usr/bin/env python
# encoding: utf-8

import graphene
from graphene_django.types import DjangoObjectType
from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User



# 定义动作约素输入类型
class UserInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    email = graphene.String(required=True)




# 定义一个创建user的mutation
class CreateUser(graphene.Mutation):
    # api的输入参数
    class Arguments:
        user_data = UserInput(required=True)

    # api的响应参数
    ok = graphene.Boolean()
    user = graphene.Field(UserType)

    # api的相应操作，这里是create
    def mutate(self, info, user_data):
        user = User.objects.create(name=user_data['name'], email=user_data['email'])
        ok = True
        return CreateUser(user=user, ok=ok)


class Query(object):
    all_user = graphene.List(UserType)

    def resolve_all_user(self, info, **kwargs):
        # 查询所有user的逻辑
        return User.objects.all()

