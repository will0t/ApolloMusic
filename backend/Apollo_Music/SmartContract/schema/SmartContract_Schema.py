#!/usr/bin/env python
# encoding: utf-8

import graphene
from graphene_django.types import DjangoObjectType
from SmartContract.models import SmartContract


class SmartContractType(DjangoObjectType):
    class Meta:
        model = SmartContract
        fields = "__all__"


# 定义动作约素输入类型
class SmartContractInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    email = graphene.String(required=True)


class Query(graphene.ObjectType):
    all_smart_contract = graphene.List(SmartContractType)


    def resolve_all_smart_contract(self, info, **kwargs):
        # 查询所有user的逻辑
        return SmartContract.objects.all()



# 定义一个创建user的mutation
class CreateSmartContract(graphene.Mutation):
    # api的输入参数
    class Arguments:
        #SmartContract_data = SmartContractInput(required=True)
        #id = graphene.ID()
        eventName = graphene.String(required=True)
        startTime = graphene.Date()
        payoutTime = graphene.Date()
        duration = graphene.Int()
        fee = graphene.Decimal()
        status = graphene.Int()
        version = graphene.Int()

    # api的响应参数
    
    ok = graphene.Boolean()
    smart_contract = graphene.Field(SmartContractType)

    # api的相应操作，这里是create
    
    def mutate(self, info, **kwargs):
        # smartContract = SmartContract.objects.create(name=user_data['name'], email=user_data['email'])
        # ok = True
        # return CreateSmartContract(smart_contract=smartContract, ok=ok)
        #sc_data = {}
        #sc_data["eventName"] = kwargs.get("eventName")
        sc_obj = SmartContract()
        for attr, value in kwargs.items():
            setattr(sc_obj, attr, value)
        #sc_obj.save()
        try:
            sc_obj.save()
            ok = True
        except:
            ok = False
        return CreateSmartContract(ok=ok, smart_contract=sc_obj)


class CMutation(graphene.ObjectType):
    create_smart_contract = CreateSmartContract.Field()

class UpdateSmartContract(graphene.Mutation):
    # api的输入参数
    class Arguments:
        #SmartContract_data = SmartContractInput(required=True)
        id = graphene.ID()
        eventName = graphene.String(required=True)
        startTime = graphene.Date()
        payoutTime = graphene.Date()
        duration = graphene.Int()
        fee = graphene.Decimal()
        status = graphene.Int()
        version = graphene.Int()

    # api的响应参数
    
    ok = graphene.Boolean()
    smart_contract = graphene.Field(SmartContractType)

    # api的相应操作，这里是create
    
    def mutate(self, info, **kwargs):
        sc_obj = SmartContract.objects.get(id=kwargs['id'])
        for attr, value in kwargs.items():
            setattr(sc_obj, attr, value)
        #sc_obj.save()
        try:
            sc_obj.save()
            ok = True
        except:
            ok = False
        return CreateSmartContract(ok=ok, smart_contract=sc_obj)


class UMutation(graphene.ObjectType):
    update_smart_contract = CreateSmartContract.Field()


class Mutation(
    CMutation,
    UMutation,
    graphene.ObjectType
):
    pass

