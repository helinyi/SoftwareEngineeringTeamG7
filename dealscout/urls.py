"""
URL configuration for dealscout project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from deals.views import react_app_view

# API Schema configuration
schema_view = get_schema_view(
   openapi.Info(
      title="DealScout API",
      default_version='v1',
      description="DealScout API endpoints",
      contact=openapi.Contact(email="support@dealscout.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('deals.urls', 'deals'), namespace='deals')),
    
    # API documentation
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# In production, React will handle all non-API & non-Admin routes
if not settings.DEBUG:
    urlpatterns += [
        # Catch all routes for the React SPA
        re_path(r'^(?!api/|admin/|media/|static/).*$', react_app_view, name='react-spa'),
    ]