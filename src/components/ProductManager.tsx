
import React, { useState } from "react";
import { Plus, Upload, X, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}

interface Props {
  language: "en" | "sw";
}

const productCopy = {
  en: {
    title: "Product/Service Management",
    addProduct: "Add Product/Service",
    productName: "Product/Service Name",
    description: "Description",
    price: "Price (KSh)",
    category: "Category",
    uploadImage: "Upload Image",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    noProducts: "No products/services added yet",
    addFirst: "Add your first product or service",
  },
  sw: {
    title: "Usimamizi wa Bidhaa/Huduma",
    addProduct: "Ongeza Bidhaa/Huduma",
    productName: "Jina la Bidhaa/Huduma",
    description: "Maelezo",
    price: "Bei (KSh)",
    category: "Jamii",
    uploadImage: "Pakia Picha",
    save: "Hifadhi",
    cancel: "Ghairi",
    edit: "Hariri",
    delete: "Futa",
    noProducts: "Hakuna bidhaa/huduma zilizojazwa bado",
    addFirst: "Ongeza bidhaa au huduma yako ya kwanza",
  },
};

const ProductManager: React.FC<Props> = ({ language }) => {
  const copy = productCopy[language];
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Samsung Galaxy S24",
      description: "Latest smartphone with advanced camera features",
      price: 85000,
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      category: "Electronics"
    },
    {
      id: "2",
      name: "MacBook Pro",
      description: "Professional laptop for creative work",
      price: 250000,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      category: "Electronics"
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData, price: parseFloat(formData.price) }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        category: formData.category
      };
      setProducts([...products, newProduct]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "", imageUrl: "" });
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl || ""
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Supabase storage
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{copy.title}</h3>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          {copy.addProduct}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? copy.edit : copy.addProduct}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{copy.productName}</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">{copy.description}</label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{copy.price}</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">{copy.category}</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">{copy.uploadImage}</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Upload size={20} className="text-gray-400" />
                </div>
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="mt-2 h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {copy.save}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  {copy.cancel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg font-medium">{copy.noProducts}</p>
          <p className="text-sm">{copy.addFirst}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              {product.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{product.name}</h4>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManager;
