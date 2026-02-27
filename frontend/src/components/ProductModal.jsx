import React, { useEffect, useState } from "react";

export default function ProductModal({
  open,
  mode,
  initialProduct,
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [article, setArticle] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initialProduct?.name ?? "");
    setCategory(initialProduct?.category ?? "");
    setPrice(initialProduct?.price != null ? String(initialProduct.price) : "");
    setDescription(initialProduct?.description ?? "");
    setQuantity(initialProduct?.quantity != null ? String(initialProduct.quantity) : "");
    setArticle(initialProduct?.article ?? "");
    setBrand(initialProduct?.brand ?? "");
  }, [open, initialProduct]);

  if (!open) return null;

  const title =
    mode === "edit" ? "Редактирование запчасти" : "Добавление запчасти";

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (!trimmedName) {
      alert("Введите название запчасти");
      return;
    }
    if (!category.trim()) {
      alert("Выберите категорию");
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert("Введите корректную цену");
      return;
    }
    if (!Number.isFinite(parsedQuantity) || parsedQuantity < 0) {
      alert("Введите корректное количество");
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      name: trimmedName,
      category: category.trim(),
      price: parsedPrice,
      description: description.trim(),
      quantity: parsedQuantity,
      article: article.trim(),
      brand: brand.trim(),
    });
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="iconBtn" onClick={onClose}>✕</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название детали *
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Масляный фильтр"
              autoFocus
            />
          </label>

          <label className="label">
            Категория *
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Выберите категорию</option>
              <option value="Двигатель">Двигатель</option>
              <option value="Тормозная система">Тормозная система</option>
              <option value="Подвеска">Подвеска</option>
              <option value="Фильтры">Фильтры</option>
              <option value="Система зажигания">Система зажигания</option>
              <option value="Трансмиссия">Трансмиссия</option>
              <option value="Электрика">Электрика</option>
              <option value="Кузов">Кузов</option>
            </select>
          </label>

          <div className="form-row">
            <label className="label">
              Цена (₽) *
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                inputMode="numeric"
              />
            </label>

            <label className="label">
              Количество на складе *
              <input
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                inputMode="numeric"
              />
            </label>
          </div>

          <label className="label">
            Описание
            <textarea
              className="input textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Подробное описание запчасти..."
              rows="3"
            />
          </label>

          <div className="form-row">
            <label className="label">
              Артикул
              <input
                className="input"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Например, LF-001"
              />
            </label>

            <label className="label">
              Производитель
              <input
                className="input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Например, Lada, TRW"
              />
            </label>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === "edit" ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}