-- Seed sample products
INSERT INTO products (name, slug, description, price, sale_price, image_url, category_id, stock_quantity, unit, is_featured, is_new, is_on_sale) VALUES
-- Vegetables
('Fresh Tomatoes', 'fresh-tomatoes', 'Farm fresh red tomatoes', 120.00, NULL, '/placeholder.svg?height=300&width=300', 1, 100, 'kg', TRUE, FALSE, FALSE),
('Green Spinach', 'green-spinach', 'Organic green spinach leaves', 60.00, 50.00, '/placeholder.svg?height=300&width=300', 1, 80, 'bundle', FALSE, TRUE, TRUE),
('Fresh Onions', 'fresh-onions', 'Quality onions for cooking', 80.00, NULL, '/placeholder.svg?height=300&width=300', 1, 150, 'kg', TRUE, FALSE, FALSE),
('Potatoes', 'potatoes', 'Fresh potatoes', 70.00, 60.00, '/placeholder.svg?height=300&width=300', 1, 200, 'kg', FALSE, FALSE, TRUE),

-- Fruits
('Fresh Apples', 'fresh-apples', 'Crispy red apples', 250.00, NULL, '/placeholder.svg?height=300&width=300', 2, 100, 'kg', TRUE, TRUE, FALSE),
('Bananas', 'bananas', 'Ripe yellow bananas', 120.00, 100.00, '/placeholder.svg?height=300&width=300', 2, 120, 'dozen', TRUE, FALSE, TRUE),
('Oranges', 'oranges', 'Juicy oranges', 180.00, NULL, '/placeholder.svg?height=300&width=300', 2, 90, 'kg', FALSE, TRUE, FALSE),

-- Dairy & Eggs
('Fresh Milk', 'fresh-milk', 'Pure fresh milk', 180.00, NULL, '/placeholder.svg?height=300&width=300', 3, 50, 'liter', TRUE, FALSE, FALSE),
('Farm Eggs', 'farm-eggs', 'Farm fresh eggs', 280.00, 250.00, '/placeholder.svg?height=300&width=300', 3, 100, 'dozen', TRUE, TRUE, TRUE),
('Butter', 'butter', 'Creamy butter', 350.00, NULL, '/placeholder.svg?height=300&width=300', 3, 60, 'pack', FALSE, FALSE, FALSE),

-- Meat & Fish
('Chicken', 'chicken', 'Fresh chicken meat', 450.00, 420.00, '/placeholder.svg?height=300&width=300', 4, 40, 'kg', TRUE, FALSE, TRUE),
('Fish', 'fish', 'Fresh river fish', 600.00, NULL, '/placeholder.svg?height=300&width=300', 4, 30, 'kg', FALSE, TRUE, FALSE),

-- Rice & Flour
('Basmati Rice', 'basmati-rice', 'Premium basmati rice', 280.00, 250.00, '/placeholder.svg?height=300&width=300', 6, 100, 'kg', TRUE, FALSE, TRUE),
('Wheat Flour', 'wheat-flour', 'Fine wheat flour', 120.00, NULL, '/placeholder.svg?height=300&width=300', 6, 150, 'kg', FALSE, FALSE, FALSE),

-- Cooking Oil
('Sunflower Oil', 'sunflower-oil', 'Pure sunflower cooking oil', 450.00, 400.00, '/placeholder.svg?height=300&width=300', 7, 80, 'liter', TRUE, TRUE, TRUE),

-- Spices
('Red Chili Powder', 'red-chili-powder', 'Pure red chili powder', 200.00, NULL, '/placeholder.svg?height=300&width=300', 8, 100, '250g', FALSE, FALSE, FALSE),
('Turmeric Powder', 'turmeric-powder', 'Organic turmeric powder', 150.00, 130.00, '/placeholder.svg?height=300&width=300', 8, 120, '250g', TRUE, TRUE, TRUE)
ON CONFLICT (slug) DO NOTHING;
