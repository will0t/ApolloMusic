import graphene
import User.schema
import SmartContract.schema



class Query(User.schema.Query, SmartContract.schema.Query , graphene.ObjectType):
    # all_user = User.Schema.Query.all_user
    # 总的Schema的query入口
    pass



class Mutations(graphene.ObjectType):
    # 总的Schema的mutations入口
    create_user = User.schema.CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
