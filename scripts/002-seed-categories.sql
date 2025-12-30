-- Seed categories
INSERT INTO categories (name, slug, image_url) VALUES
('Vegetables', 'vegetables', '/placeholder.svg?height=200&width=200'),
('Fruits', 'fruits', '/placeholder.svg?height=200&width=200'),
('Dairy & Eggs', 'dairy-eggs', '/placeholder.svg?height=200&width=200'),
('Meat & Fish', 'meat-fish', '/placeholder.svg?height=200&width=200'),
('Bakery', 'bakery', '/placeholder.svg?height=200&width=200'),
('Rice & Flour', 'rice-flour', '/placeholder.svg?height=200&width=200'),
('Cooking Oil', 'cooking-oil', '/placeholder.svg?height=200&width=200'),
('Spices', 'spices', '/placeholder.svg?height=200&width=200'),
('Snacks', 'snacks', '/placeholder.svg?height=200&width=200'),
('Beverages', 'beverages', '/placeholder.svg?height=200&width=200'),
('Household', 'household', '/placeholder.svg?height=200&width=200'),
('Personal Care', 'personal-care', '/placeholder.svg?height=200&width=200')
ON CONFLICT (slug) DO NOTHING;
