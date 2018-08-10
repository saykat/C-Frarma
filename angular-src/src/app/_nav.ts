export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Sales',
    url: '/sales',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'New Sales',
        url: '/sales/new-sales',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Products',
    url: '/products',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Product',
        url: '/products/add-product',
        icon: 'icon-puzzle'
      },
      {
        name: 'Add Medicine Group',
        url: '/products/add-medicine-group',
        icon: 'icon-puzzle'
      },
      {
        name: 'Add Company',
        url: '/products/add-company',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Purchase',
    url: '/purchase',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'New Purchase',
        url: '/purchase/new-purchase',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    icon: 'icon-puzzle',
  }
];
