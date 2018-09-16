export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
    },
  {
    name: 'Sales',
    url: '/sales',
    icon: 'icon-basket-loaded',
    children: [
      {
        name: 'New Sales',
        url: '/sales/new-sales',
        icon: 'fa fa-barcode'
      }
    ]
  },
  {
    name: 'Products',
    url: '/products',
    icon: 'fa fa-cube',
    children: [
      {
        name: 'Add Product',
        url: '/products/add-product',
        icon: 'icon-plus'
      },
      {
        name: 'Add Medicine Group',
        url: '/products/add-medicine-group',
        icon: 'icon-plus'
      },
      {
        name: 'Add Company',
        url: '/products/add-company',
        icon: 'icon-plus'
      }
    ]
  },
  {
    name: 'Purchase',
    url: '/purchase',
    icon: 'fa fa-truck',
    children: [
      {
        name: 'New Purchase',
        url: '/purchase/new-purchase',
        icon: 'fa fa-cubes'
      }
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    icon: 'fa fa-bank',
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fa fa-bar-chart',
    children: [
      {
        name: 'Sales Report',
        url: '/purchase/new-purchase',
        icon: 'icon-arrow-right-circle'
      },
      {
        name: 'Parchase Report',
        url: '/purchase/new-purchase',
        icon: 'icon-arrow-right-circle'
      }
    ]
  }
];
