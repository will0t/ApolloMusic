import graphene
import User.schema
import SmartContract.schema



class Query(User.schema.Query, SmartContract.schema.Query , graphene.ObjectType):
    # all_user = User.Schema.Query.all_user
    # the entry point of the query schema
    pass



class Mutations(graphene.ObjectType):
    # the entry point of the mutation schema
    create_user = User.schema.CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
