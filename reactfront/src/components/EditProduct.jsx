import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const endpoint = 'http://localhost:8000/api/product/'

const EditProduct = () => {

    const [name, setName] = useState('') 
    const [description, setDescription] = useState('') 
    const [categories, setCategories] = useState('') 
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    await axios.put(`${endpoint}${id}`, {
        name: name,
        description: description,
        categories: categories, 
        price: price,
        discount: discount
    })
    navigate('/')
  }  
  useEffect( () => {
    const getProductById = async () => {
        const response = await axios.get(`${endpoint}${id}`)
        setName(response.data.name)
        setDescription(response.data.description)
        setCategories(response.data.categories)
        setPrice(response.data.price)
        setDiscount(response.data.discount)
    }
    getProductById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return (
    <div>

        <h3>Editar Producto</h3>
        <form onSubmit={update}>
        <div className='mb-3'>
            <label className='form-label'>Nombre</label>
            <input 
                value={name}
                onChange={ (e) => setName(e.target.value)}
                type="text"
                className='form-control' 
            />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Descripcion</label>
            <input 
                value={description}
                onChange={ (e) => setDescription(e.target.value)}
                type="text"
                className='form-control' 
            />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Categories</label>
            <input 
                value={categories}
                onChange={ (e) => setCategories(e.target.value)}
                type="text"
                className='form-control' 
            />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Precio</label>
            <input 
                value={price}
                onChange={ (e) => setPrice(e.target.value)}
                type="number"
                className='form-control' 
            />
        </div>

        <div className='mb-3'>
            <label className='form-label'>Descuento</label>
            <input 
                value={discount}
                onChange={ (e) => setDiscount(e.target.value)}
                type="number"
                className='form-control' 
            />
        </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
        </form>
    </div>
  )
}

export default EditProduct