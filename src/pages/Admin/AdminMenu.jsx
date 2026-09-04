import { useState } from 'react';
import './AdminMenu.css';

export default function AdminMenu({ menu, onAddMenuItem }) {
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Especialidades',
    price: '',
    description: '',
    badge: 'Nuevo'
  });

  const handleAddDish = (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;
    if (onAddMenuItem) {
      onAddMenuItem({
        ...newDish,
        id: Date.now(),
        price: Number(newDish.price)
      });
    }
    setNewDish({
      name: '',
      category: 'Especialidades',
      price: '',
      description: '',
      badge: 'Nuevo'
    });
  };

  return (
    <div className="admin-section">
      <div className="section-header-actions">
        <div>
          <h2>Catálogo del Menú</h2>
          <p>Añade y visualiza los platillos disponibles.</p>
        </div>
      </div>

      <div className="menu-admin-grid">
        <div className="menu-form-card">
          <h3>Agregar Platillo</h3>
          <form onSubmit={handleAddDish} className="dish-form">
            <div className="form-group">
              <label>Nombre del Platillo</label>
              <input 
                type="text" 
                value={newDish.name}
                onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                placeholder="Ej. Trompo al Pastor Premium"
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <select 
                  value={newDish.category}
                  onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                >
                  <option value="Especialidades">Especialidades</option>
                  <option value="Del Mar">Del Mar</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Postres">Postres</option>
                </select>
              </div>
              <div className="form-group">
                <label>Precio (MXN)</label>
                <input 
                  type="number" 
                  value={newDish.price}
                  onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                  placeholder="250"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                rows="3"
                value={newDish.description}
                onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                placeholder="Ingredientes clave y notas..."
              />
            </div>

            <button type="submit" className="btn-submit-dish">
              Registrar Platillo
            </button>
          </form>
        </div>

        <div className="menu-list-card">
          <h3>Carta Vigente ({menu.length})</h3>
          <div className="menu-items-scroll">
            {menu.map(dish => (
              <div className="admin-dish-item" key={dish.id}>
                <div className="dish-info">
                  <h4>{dish.name}</h4>
                  <span className="dish-cat">{dish.category}</span>
                </div>
                <div className="dish-meta">
                  <span className="dish-price">${dish.price}</span>
                  {dish.badge && <span className="dish-badge">{dish.badge}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
