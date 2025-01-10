from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from datetime import timedelta
from .models import *
from .serializers import *


# Create your views here.
def hello_world(request):
    return JsonResponse({"message": "Hello World"})

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        
        refresh = RefreshToken.for_user(user)
        
        access_token = refresh.access_token
        access_token.set_exp(lifetime=timedelta(hours=48))

        return Response({
            "message": "User registered successfully",
            "refresh": str(refresh),
            "access": str(access_token),
        }, status=status.HTTP_201_CREATED)

# Login User View
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = User.objects.filter(username=username).first()
    if user and user.check_password(password):
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        access_token.set_exp(lifetime=timedelta(hours=48))

        return Response({
            "message": "Login successfully",
            "refresh": str(refresh),
            "access": str(access_token),
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })


# expences views
@api_view(['POST'])
@permission_classes([IsAuthenticated]) # to check that user is authenticated or not
def add_new_expense(request):
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({"error": "Please login or register"}, status=400)
        title = request.data.get('title')
        amount = request.data.get('amount')
        description = request.data.get('description')
        date = request.data.get('date')

        if not title or not amount:
            return Response({"error": "Title and amount are required."}, status=400)

        expense = Expenses.objects.create(
            user=request.user,
            title=title,
            amount=amount,
            description=description,
            date=date
        )

        return Response({
            "message": "Expense added successfully.",
            "expense": {
                "id": expense.id,
                "title": expense.title,
                "amount": expense.amount,
                "description": expense.description,
                "date": expense.date
            }
        }, status=201)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_expense(request):
    try:
        expense_id = request.data.get('expenceId')
        if not expense_id:
            return Response({"error": "Expense ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        expense = Expenses.objects.get(id=expense_id, user=request.user)

        expense.delete()
        return Response({"message": "Expense deleted successfully"}, status=status.HTTP_200_OK)
    except Expenses.DoesNotExist:
        return Response({"error": "Expense not found or you don't have permission to delete it"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def update_expence(request):
    expense_id = request.data.get('expense_id')
    title = request.data.get('title')
    amount = request.data.get('amount')
    description = request.data.get('description')
    date = request.data.get('date')

    try:
        expense = Expenses.objects.get(id=expense_id, user=request.user)
    except Expenses.DoesNotExist:
        return Response({"message": "Expense not found or you don't have permission to edit it."}, status=404)

    expense.title = title
    expense.amount = amount
    expense.description = description
    expense.date = date

    try:
        expense.save()
    except Exception as e:
        return Response({"error": f"Error saving expense: {str(e)}"}, status=500)
    
    return Response({
        "message": "Expense updated successfully.",
        "expense": {
            "id": expense.id,
            "title": expense.title,
            "amount": expense.amount,
            "description": expense.description,
            "date": expense.date
        }
    }, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_All_Expences(request):
    if request.method == 'GET':
        user = request.user
        expenses = Expenses.objects.filter(user=user)
        serializer = ExpensesSerializer(expenses, many=True)
        return Response({
            "message": "Expenses retrieved successfully.",
            "expenses": serializer.data
        }, status=200)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getExpenceById(request):
    expense_id = request.query_params.get('expense_id')  # Get the expense_id from the query parameters
    if not expense_id:
        return Response({"error": "expense_id is required."}, status=400)
    
    try:
        expense = Expenses.objects.get(id=expense_id, user=request.user)
    except Expenses.DoesNotExist:
        return Response({"message": "Expense not found or you don't have permission to GET it."}, status=404)
    
    return Response({
        "message": "Expense retrieved successfully.",
        "expense": {
            "id": expense.id,
            "title": expense.title,
            "amount": expense.amount,
            "description": expense.description,
            "date": expense.date
        }
    }, status=200)
