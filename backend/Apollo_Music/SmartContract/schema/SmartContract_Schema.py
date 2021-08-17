#!/usr/bin/env python
# encoding: utf-8

import graphene
from graphene_django.types import DjangoObjectType
from SmartContract.models import SmartContract


class SmartContractType(DjangoObjectType):
    class Meta:
        model = SmartContract



# 定义动作约素输入类型
class SmartContractInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    email = graphene.String(required=True)




# 定义一个创建user的mutation
class CreateSmartContract(graphene.Mutation):
    # api的输入参数
    class Arguments:
        SmartContract_data = SmartContractInput(required=True)

    # api的响应参数
    ok = graphene.Boolean()
    user = graphene.Field(SmartContractType)

    # api的相应操作，这里是create
    def mutate(self, info, user_data):
        smartContract = SmartContract.objects.create(name=user_data['name'], email=user_data['email'])
        ok = True
        return CreateSmartContract(smart_contract=smartContract, ok=ok)


class Query(object):
    all_smart_contract = graphene.List(SmartContractType)


    def resolve_all_user(self, info, **kwargs):
        # 查询所有user的逻辑
        return SmartContract.objects.all()

