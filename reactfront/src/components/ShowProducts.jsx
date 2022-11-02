import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'
const ShowProducts = () => {
    const [ products, setProducts ] = useState([])
    const [search, setSearch] = useState('')

    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = !search ? products : products.filter((dato)=> dato.name.toLowerCase().includes(search.toLocaleLowerCase()))

    useEffect ( ()=> {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
    const response = await axios.get(`${endpoint}/products`)
    setProducts (response.data)
    }

    const deleteProduct = async (id) => {
       await axios.delete(`${endpoint}/product/${id}`)
       getAllProducts()
    }


    return (
    <div>
        
        <div className='d-grid gap-2'>
            <Link to = "/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Crear producto</Link>
        </div>

        <div>
        <input value={search} onChange={searcher} type='text' placeholder='Buscar' className=' mt-2 mb-2 form-control' ></input>
        </div>

        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Categorias</th>
                    <th>Precio</th>
                    <th>Descuento</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                { results.map( (product) => (
                    <tr key={product.id}>
                        <td> {product.name} </td>
                        <td> {product.description} </td>
                        <td> {product.categories} </td>
                        <td> ${product.price} </td>
                        <td> {product.discount}% </td>
                        <td> 
                            <Link to={`/edit/${product.id}`} className='btn btn-warning'>Editar</Link>
                            <button onClick={ () => deleteProduct(product.id) } className='btn btn-danger'>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowProducts