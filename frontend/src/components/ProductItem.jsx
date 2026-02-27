import React from "react";

export default function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="productCard">
      <div className="productMain">
        <div className="productCategory">{product.category}</div>
        <div className="productName">{product.name}</div>
        <div className="productDetails">
          {product.article && <span>Артикул: {product.article}</span>}
          {product.brand && <span>• {product.brand}</span>}
        </div>
        {product.description && (
          <div className="productDescription">{product.description}</div>
        )}
      </div>

      <div className="productRight">
        <div className="productPrice">{product.price.toLocaleString()} ₽</div>
        <div className={`productStock ${product.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {product.quantity > 0 
            ? `В наличии: ${product.quantity} шт.`
            : 'Нет в наличии'}
        </div>
        <div className="productActions">
          <button className="btn" onClick={() => onEdit(product)}>
            Редактировать
          </button>
          <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}