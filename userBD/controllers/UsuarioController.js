import { Usuario } from '../models/Usuario';
import DatabaseService from '../database/DatabaseService';

export class UsuarioController {
  constructor() {
    this.listeners = [];
  }

  // Inicializar el controlador con el Service
  async initialize() {
    await DatabaseService.initialize();
  }

  // 5.3: Como segunda parte aquí preparamos el controlador para invocar
  // al servicio de consulta cuando se le indiquen
  async obtenerUsuarios() {
    try {
      const data = await DatabaseService.getAll();
      return data.map(
        u => new Usuario(u.id, u.nombre, u.fecha_creacion)
      );
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw new Error('No se pudieron cargar los usuarios');
    }
  }

  // 5.4: Después preparamos la función de crear usuario la cual
  // primero valida en el modelo que se cumplan las reglas y
  // luego lo agrega usando el servicio, notifica a los observadores
  // y retorna
  async crearUsuario(nombre) {
    try {
      // 1. Validar datos
      Usuario.validar(nombre);

      // 2. Insertar en BD
      const nuevoUsuario = await DatabaseService.add(nombre.trim());

      // 3. Notifica a los observadores
      this.notifyListeners();

      // 4. Retornar usuario creado
      return new Usuario(
        nuevoUsuario.id,
        nuevoUsuario.nombre,
        nuevoUsuario.fecha_creacion
      );
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async modificarUsuario(id, nombre) {
    try {
      if (!id) throw new Error('ID inválido');
      Usuario.validar(nombre);

      const actualizado = await DatabaseService.modificar(id, nombre.trim());

      this.notifyListeners();

      return new Usuario(
        actualizado.id,
        actualizado.nombre,
        actualizado.fecha_creacion || new Date().toISOString()
      );
    } catch (error) {
      console.error('Error al modificar usuario:', error);
      throw error;
    }
  }

  
async eliminarUsuario(id) {
  try {
    if (!id) throw new Error('ID inválido');
    
    await DatabaseService.eliminar(id);

    this.notifyListeners();
    return true;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
}



addListener(callback) {
  this.listeners.push(callback);
}

removeListener(callback) {
  this.listeners = this.listeners.filter(l => l !== callback);
}

notifyListeners() {
  this.listeners.forEach(callback => callback());
}

}
