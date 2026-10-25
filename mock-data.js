window.StockPilotMockData = {
  products: [
    { id: 'P-1041', name: 'Wireless Headphones Pro', sku: 'EL-AUD-041', category: 'Electronics', purchase: 3250, selling: 4999, min: 12, description: 'Noise-cancelling over-ear headphones.', stock: { 'Mumbai Central': 84, 'Delhi NCR': 36, 'Bengaluru Hub': 24 }, updated: '2026-10-24' },
    { id: 'P-1042', name: 'Ergonomic Office Chair', sku: 'OF-CHR-042', category: 'Office Furniture', purchase: 6800, selling: 9990, min: 10, description: 'Adjustable mesh-back office chair.', stock: { 'Mumbai Central': 42, 'Delhi NCR': 18, 'Bengaluru Hub': 12 }, updated: '2026-10-22' },
    { id: 'P-1043', name: 'Steel Water Bottle · 1L', sku: 'HM-DRK-043', category: 'Home & Living', purchase: 390, selling: 799, min: 20, description: 'Double-wall stainless steel bottle.', stock: { 'Mumbai Central': 16, 'Delhi NCR': 8, 'Bengaluru Hub': 6 }, updated: '2026-10-25' },
    { id: 'P-1044', name: 'A4 Premium Copy Paper', sku: 'ST-PPR-044', category: 'Stationery', purchase: 220, selling: 349, min: 18, description: '500-sheet premium copier paper.', stock: { 'Mumbai Central': 150, 'Delhi NCR': 82, 'Bengaluru Hub': 64 }, updated: '2026-10-21' },
    { id: 'P-1045', name: 'USB-C Docking Station', sku: 'EL-ACC-045', category: 'Electronics', purchase: 2450, selling: 3799, min: 8, description: 'Multi-port USB-C hub with HDMI.', stock: { 'Mumbai Central': 0, 'Delhi NCR': 0, 'Bengaluru Hub': 0 }, updated: '2026-10-20' },
    { id: 'P-1046', name: 'Organic Green Tea · 100g', sku: 'GR-TEA-046', category: 'Food & Beverage', purchase: 185, selling: 329, min: 15, description: 'Single-origin organic green tea.', stock: { 'Mumbai Central': 7, 'Delhi NCR': 5, 'Bengaluru Hub': 2 }, updated: '2026-10-23' },
    { id: 'P-1047', name: 'LED Desk Lamp', sku: 'OF-LGT-047', category: 'Office Furniture', purchase: 760, selling: 1299, min: 10, description: 'Dimmable LED task lamp with USB port.', stock: { 'Mumbai Central': 22, 'Delhi NCR': 16, 'Bengaluru Hub': 9 }, updated: '2026-10-19' },
    { id: 'P-1048', name: 'Wireless Keyboard & Mouse', sku: 'EL-ACC-048', category: 'Electronics', purchase: 920, selling: 1599, min: 10, description: 'Compact wireless keyboard and mouse set.', stock: { 'Mumbai Central': 31, 'Delhi NCR': 14, 'Bengaluru Hub': 8 }, updated: '2026-10-24' },
    { id: 'P-1049', name: 'Recycled Notebook Set', sku: 'ST-NBK-049', category: 'Stationery', purchase: 160, selling: 279, min: 20, description: 'Set of three recycled paper notebooks.', stock: { 'Mumbai Central': 48, 'Delhi NCR': 27, 'Bengaluru Hub': 19 }, updated: '2026-10-18' },
    { id: 'P-1050', name: 'Ceramic Coffee Mug Set', sku: 'HM-KIT-050', category: 'Home & Living', purchase: 480, selling: 899, min: 12, description: 'Set of two glazed ceramic mugs.', stock: { 'Mumbai Central': 11, 'Delhi NCR': 9, 'Bengaluru Hub': 6 }, updated: '2026-10-25' },
    { id: 'P-1051', name: 'Packing Tape · 6 Pack', sku: 'PK-TAP-051', category: 'Packaging', purchase: 210, selling: 369, min: 14, description: 'Heavy-duty clear packing tape rolls.', stock: { 'Mumbai Central': 37, 'Delhi NCR': 25, 'Bengaluru Hub': 18 }, updated: '2026-10-17' },
    { id: 'P-1052', name: 'Thermal Label Printer', sku: 'EL-PRN-052', category: 'Electronics', purchase: 3850, selling: 5499, min: 6, description: 'Compact 4-inch shipping label printer.', stock: { 'Mumbai Central': 8, 'Delhi NCR': 4, 'Bengaluru Hub': 2 }, updated: '2026-10-16' }
  ],
  categories: ['Electronics', 'Office Furniture', 'Home & Living', 'Stationery', 'Food & Beverage', 'Packaging'],
  warehouses: [
    { id: 'W-01', name: 'Mumbai Central', location: 'Andheri East, Mumbai', status: 'Active' },
    { id: 'W-02', name: 'Delhi NCR', location: 'Okhla Phase II, New Delhi', status: 'Active' },
    { id: 'W-03', name: 'Bengaluru Hub', location: 'Whitefield, Bengaluru', status: 'Active' }
  ],
  suppliers: [
    { id: 'S-01', name: 'Apex Tech Distributors', contact: 'Rohan Mehta', email: 'orders@apextech.in', phone: '+91 22 4567 8901', city: 'Mumbai', products: 18, status: 'Active' },
    { id: 'S-02', name: 'Northstar Office Supplies', contact: 'Priya Khanna', email: 'sales@northstar.in', phone: '+91 11 2345 6789', city: 'New Delhi', products: 12, status: 'Active' },
    { id: 'S-03', name: 'Greenfield Consumer Goods', contact: 'Karthik Rao', email: 'hello@greenfield.in', phone: '+91 80 4123 4567', city: 'Bengaluru', products: 9, status: 'Active' },
    { id: 'S-04', name: 'Papertrail India Pvt Ltd', contact: 'Ananya Das', email: 'care@papertrail.in', phone: '+91 33 2234 5678', city: 'Kolkata', products: 7, status: 'Active' }
  ],
  orders: [
    { id: 'PO-2026-0084', supplier: 'Apex Tech Distributors', date: '2026-10-24', items: [{ productId: 'P-1045', qty: 20, price: 2450 }], status: 'Ordered' },
    { id: 'PO-2026-0083', supplier: 'Northstar Office Supplies', date: '2026-10-22', items: [{ productId: 'P-1044', qty: 50, price: 220 }, { productId: 'P-1049', qty: 30, price: 160 }], status: 'Partially Received', received: { 'P-1044': 20 } },
    { id: 'PO-2026-0082', supplier: 'Greenfield Consumer Goods', date: '2026-10-19', items: [{ productId: 'P-1046', qty: 40, price: 185 }], status: 'Draft' },
    { id: 'PO-2026-0081', supplier: 'Apex Tech Distributors', date: '2026-10-15', items: [{ productId: 'P-1048', qty: 25, price: 920 }], status: 'Received' },
    { id: 'PO-2026-0080', supplier: 'Papertrail India Pvt Ltd', date: '2026-10-12', items: [{ productId: 'P-1049', qty: 40, price: 160 }], status: 'Cancelled' },
    { id: 'PO-2026-0079', supplier: 'Northstar Office Supplies', date: '2026-10-09', items: [{ productId: 'P-1042', qty: 10, price: 6800 }], status: 'Received' }
  ],
  movements: [
    { id: 'MOV-8421', type: 'Stock Received', productId: 'P-1041', qty: 24, warehouse: 'Mumbai Central', date: '2026-10-25', reference: 'PO-2026-0081', note: 'Supplier delivery checked in' },
    { id: 'MOV-8420', type: 'Stock Issue', productId: 'P-1043', qty: -3, warehouse: 'Delhi NCR', date: '2026-10-25', reference: 'SO-2026-0318', note: 'Customer order fulfilled' },
    { id: 'MOV-8419', type: 'Warehouse Transfer', productId: 'P-1047', qty: 6, warehouse: 'Bengaluru Hub', date: '2026-10-24', reference: 'TR-2026-0042', note: 'Transfer from Mumbai Central' },
    { id: 'MOV-8418', type: 'Stock Adjustment', productId: 'P-1046', qty: -2, warehouse: 'Mumbai Central', date: '2026-10-24', reference: 'ADJ-2026-0014', note: 'Cycle count correction' },
    { id: 'MOV-8417', type: 'Customer Return', productId: 'P-1048', qty: 1, warehouse: 'Delhi NCR', date: '2026-10-23', reference: 'RET-2026-0012', note: 'Returned item passed inspection' },
    { id: 'MOV-8416', type: 'Opening Stock', productId: 'P-1044', qty: 80, warehouse: 'Mumbai Central', date: '2026-10-22', reference: 'OPEN-2026', note: 'Opening balance migration' },
    { id: 'MOV-8415', type: 'Stock Received', productId: 'P-1052', qty: 8, warehouse: 'Mumbai Central', date: '2026-10-21', reference: 'PO-2026-0077', note: 'Initial purchase delivery' },
    { id: 'MOV-8414', type: 'Stock Issue', productId: 'P-1050', qty: -2, warehouse: 'Bengaluru Hub', date: '2026-10-20', reference: 'SO-2026-0312', note: 'Retail order fulfilled' },
    { id: 'MOV-8413', type: 'Stock Received', productId: 'P-1042', qty: 10, warehouse: 'Delhi NCR', date: '2026-10-19', reference: 'PO-2026-0079', note: 'Supplier delivery checked in' },
    { id: 'MOV-8412', type: 'Warehouse Transfer', productId: 'P-1049', qty: 12, warehouse: 'Delhi NCR', date: '2026-10-18', reference: 'TR-2026-0040', note: 'Transfer from Bengaluru Hub' }
  ],
  sales: [
    { id: 'SO-2026-0318', date: '2026-10-25', productId: 'P-1043', qty: 3, warehouse: 'Delhi NCR', status: 'Completed' },
    { id: 'SO-2026-0317', date: '2026-10-25', productId: 'P-1041', qty: 2, warehouse: 'Mumbai Central', status: 'Completed' },
    { id: 'SO-2026-0316', date: '2026-10-24', productId: 'P-1048', qty: 1, warehouse: 'Bengaluru Hub', status: 'Completed' },
    { id: 'SO-2026-0315', date: '2026-10-24', productId: 'P-1050', qty: 2, warehouse: 'Bengaluru Hub', status: 'Completed' },
    { id: 'SO-2026-0314', date: '2026-10-23', productId: 'P-1042', qty: 1, warehouse: 'Delhi NCR', status: 'Completed' }
  ],
  settings: { business: 'StockPilot India', currency: 'INR', dateFormat: 'DD MMM YYYY', theme: 'Light', threshold: 10 }
};
