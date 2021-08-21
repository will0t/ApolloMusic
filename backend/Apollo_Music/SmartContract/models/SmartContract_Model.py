from django.db import models
import uuid

CONTRACT_TYPE = (
    (0, "Created"),
    (1, "Accepted"),
    (2, "Cancelled"),
    (3, "Done"),
)

class SmartContract(models.Model):
    class Meta:
        app_label = 'SmartContract'
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    eventName = models.CharField(max_length=60, unique=True, null=False)
    startTime = models.DateTimeField(null=False)
    duration = models.IntegerField(null=False)
    payoutTime = models.DateTimeField(null=False)
    updateTime = models.DateTimeField(auto_now=True)
    createTime = models.DateTimeField(auto_now=True)

    #address = models.CharField(max_length=200, null=False)
    #city = models.CharField(max_length=20, null=False)
    #country = models.CharField(max_length=20, null=False)
    
    payAmount = models.DecimalField(max_digits=20, decimal_places=5, null=False)
    receiverWalletAddress = models.CharField(max_length=200, null=False)

    #generatedCode = models.CharField(max_length=100)
    
    #receiver = models.ManyToManyField(to="User.User")
    receiverEmail = models.EmailField(max_length=200, null=False)
    #creator = models.ForeignKey(to="User.User", related_name='creator', on_delete=models.SET_NULL, null=True)
    creatorName = models.CharField(max_length=200, null=False)
    creatorEmail = models.EmailField(max_length=200, null=False)
    #updater = models.ForeignKey(to="User.User", related_name='updater', on_delete=models.SET_NULL, null=True)
    
    status = models.SmallIntegerField(choices=CONTRACT_TYPE)
    version = models.IntegerField(null=False)

    # attachments = models.FilePathField()
    # terms = models.TextField()
    # condition =  models.TextField()
