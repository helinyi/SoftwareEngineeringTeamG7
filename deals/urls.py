from django.urls import path
from . import views

app_name = 'deals'

urlpatterns = [
    path('', views.home, name='home'),
    path('products/', views.ProductListView.as_view(), name='product_list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(),
         name='product_detail'),
    path('search/', views.search_results, name='search_results'),
]
