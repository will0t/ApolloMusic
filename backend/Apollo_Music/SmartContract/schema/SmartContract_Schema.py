#!/usr/bin/env python
# encoding: utf-8

import graphene
import datetime
from graphene_django.types import DjangoObjectType
from SmartContract.models import SmartContract
from django.utils import timezone


class SmartContractType(DjangoObjectType):
    class Meta:
        model = SmartContract
        fields = "__all__"


# # 定义动作约素输入类型
# class SmartContractInput(graphene.InputObjectType):
#     name = graphene.String(required=True)
#     email = graphene.String(required=True)


class Query(graphene.ObjectType):
    all_smart_contract = graphene.List(SmartContractType)
    get_smart_contract_withID = graphene.Field(SmartContractType, id=graphene.String())

    def resolve_all_smart_contract(self, info, **kwargs):
        # find all smartcontracts
        return SmartContract.objects.all()

    def resolve_get_smart_contract_withID(self, info, id):
        # get the smart contract with the id
        sc_obj = SmartContract.objects.get(id=id)
        if not sc_obj:
            #print("NO")
            return None
        return SmartContract.objects.get(id=id)


# 定义一个创建user的mutation
class CreateSmartContract(graphene.Mutation):
    # api的输入参数
    class Arguments:
        #SmartContract_data = SmartContractInput(required=True)
        #scid = graphene.String(required=True)
        eventName = graphene.String(required=True)
        startTime = graphene.DateTime(required=True)
        payoutTime = graphene.DateTime(required=True)
        duration = graphene.Int(required=True)
        #address = graphene.String(required=True)
        #city = graphene.String(required=True)
        #country = graphene.String(required=True)
        location = graphene.String(required=True)
        payAmount = graphene.Decimal(required=True)
        receiverWalletAddress = graphene.String(required=True)
        receiverName = graphene.String(required=True)
        receiverEmail = graphene.String(required=True)
        creatorName = graphene.String(required=True)
        creatorEmail = graphene.String(required=True)

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
        # status should be set to 0(created)
        kwargs['status'] = 0
        kwargs['version'] = 1
        for attr, value in kwargs.items():
            setattr(sc_obj, attr, value)
        # sc_obj.save()
        # ok = True
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
        id = graphene.String(required=True)
        eventName = graphene.String(required=True)
        startTime = graphene.DateTime(required=True)
        payoutTime = graphene.DateTime(required=True)
        duration = graphene.Int(required=True)
        #address = graphene.String(required=True)
        #city = graphene.String(required=True)
        #country = graphene.String(required=True)
        location = graphene.String(required=True)
        payAmount = graphene.Decimal(required=True)
        receiverWalletAddress = graphene.String(required=True)
        receiverName = graphene.String(required=True)
        receiverEmail = graphene.String(required=True)
        creatorName = graphene.String(required=True)
        creatorEmail = graphene.String(required=True)
        status = graphene.Int(required=False)

    # api的响应参数
    
    ok = graphene.Boolean()
    smart_contract = graphene.Field(SmartContractType)

    # api的相应操作，这里是create
    
    def mutate(self, info, **kwargs):
        sc_obj = SmartContract.objects.get(id=kwargs['id'])
        if not sc_obj:
            return UpdateSmartContract(ok=False)
        kwargs['version'] = sc_obj.__dict__['version'] + 1
        for attr, value in kwargs.items():
            setattr(sc_obj, attr, value)
        #sc_obj.save()
        try:
            sc_obj.save()
            ok = True
        except:
            ok = False
        return UpdateSmartContract(ok=ok, smart_contract=sc_obj)


class UMutation(graphene.ObjectType):
    update_smart_contract = UpdateSmartContract.Field()


class Mutation(
    CMutation,
    UMutation,
    graphene.ObjectType
):
    pass

