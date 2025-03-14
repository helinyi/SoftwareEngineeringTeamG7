from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.views.generic import ListView, DetailView
from .models import Product, ProductListing, Category, Retailer


def home(request):
    """首页视图"""
    featured_deals = ProductListing.objects.filter(
        in_stock=True
    ).order_by('-discount_percentage')[:10]  # 获取折扣最高的10个产品

    categories = Category.objects.filter(parent=None)[:8]  # 获取主要分类

    trending_products = Product.objects.all().order_by(
        '-created_at')[:8]  # 最新添加的产品

    context = {
        'featured_deals': featured_deals,
        'categories': categories,
        'trending_products': trending_products,
    }
    return render(request, 'deals/home.html', context)


class ProductListView(ListView):
    """产品列表视图"""
    model = Product
    template_name = 'deals/product_list.html'
    context_object_name = 'products'
    paginate_by = 20

    def get_queryset(self):
        queryset = super().get_queryset()

        # 搜索功能
        search_query = self.request.GET.get('q', '')
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(brand__icontains=search_query) |
                Q(description__icontains=search_query)
            )

        # 分类过滤
        category_id = self.request.GET.get('category', '')
        if category_id and category_id.isdigit():
            queryset = queryset.filter(categories__id=category_id)

        # 价格过滤 (使用最低价格)
        min_price = self.request.GET.get('min_price', '')
        max_price = self.request.GET.get('max_price', '')
        if min_price and min_price.isdigit():
            queryset = queryset.filter(listings__price__gte=min_price)
        if max_price and max_price.isdigit():
            queryset = queryset.filter(listings__price__lte=max_price)

        # 品牌过滤
        brand = self.request.GET.get('brand', '')
        if brand:
            queryset = queryset.filter(brand__iexact=brand)

        # 排序
        sort_by = self.request.GET.get('sort_by', 'newest')
        if sort_by == 'price_low':
            queryset = queryset.order_by('listings__price')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-listings__price')
        elif sort_by == 'discount':
            queryset = queryset.order_by('-listings__discount_percentage')
        else:  # newest
            queryset = queryset.order_by('-created_at')

        return queryset.distinct()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # 添加过滤器所需的数据
        context['categories'] = Category.objects.filter(parent=None)
        context['brands'] = Product.objects.order_by(
            'brand').values_list('brand', flat=True).distinct()
        context['retailers'] = Retailer.objects.filter(is_active=True)

        # 保存当前的查询参数，用于分页
        context['current_query'] = self.request.GET.copy()
        if 'page' in context['current_query']:
            del context['current_query']['page']

        return context


class ProductDetailView(DetailView):
    """产品详情视图"""
    model = Product
    template_name = 'deals/product_detail.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        product = self.get_object()

        # 获取该产品在各个零售商的价格
        context['listings'] = product.listings.filter(
            in_stock=True).order_by('price')

        # 获取价格历史数据
        if product.listings.exists():
            main_listing = product.listings.order_by('price').first()
            context['price_history'] = main_listing.price_history.all()[
                :30]  # 最近30条价格记录

        # 获取相关产品
        context['related_products'] = Product.objects.filter(
            categories__in=product.categories.all()
        ).exclude(id=product.id).distinct()[:6]

        # 评论
        context['reviews'] = product.reviews.all().order_by('-created_at')

        return context


def search_results(request):
    """搜索结果视图"""
    query = request.GET.get('q', '')

    if not query:
        return render(request, 'deals/search_results.html', {'products': []})

    products = Product.objects.filter(
        Q(name__icontains=query) |
        Q(brand__icontains=query) |
        Q(description__icontains=query)
    ).distinct()

    context = {
        'products': products,
        'query': query
    }
    return render(request, 'deals/search_results.html', context)
