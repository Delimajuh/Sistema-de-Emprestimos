import React, { useEffect, useState } from 'react';
import BasicTable  from '../../components/TableList'; // Importando a Tabela base do diretório components
import './index.css'; // Importar estilos

import Modal from '../../components/Modal';
import InputText from '../../components/InputText';
import Dropdown from '../../components/Dropdown';
import TextArea from '../../components/TextArea';
import { useCategory } from '../../providers/CategoryContext';
import { useEquipament } from '../../providers/EquipamentsContext';

const Equipamentos = () => {
  const columns = ["Modelo", "Fabricante", "Categoria"];
  const equipamentsContext = useEquipament();
  const categoriesContext = useCategory()

  function serializeCategories() {
    return categoriesContext.read.categories.map(category => {
      return {
        value: category.id,
        description: category.name
      }
    })
  }

  function serializeEquipaments() {
    return equipamentsContext.read.equipaments.map(equipament => {
      return {
        Modelo: equipament.model,
        Fabricante: equipament.manufacturer,
        Categoria: equipament.category.name,
      }
    })
  }

//Funções de contagem de cadastros
  function getTotalEquipments() {
    return equipamentsContext.read.equipaments.length;
  }

  function getTotalCategories() {
    const uniqueCategories = new Set();
  
    equipamentsContext.read.equipaments.forEach(equipament => {
      uniqueCategories.add(equipament.category.name);
    });
  
    return {
      categoriesCount: uniqueCategories.size,
    };
  }

  function getTotalManufacturers() {
    const uniqueManufacturers = new Set();
  
    equipamentsContext.read.equipaments.forEach(equipament => {
      uniqueManufacturers.add(equipament.manufacturer);
    });
  
    return {
      manufacturersCount: uniqueManufacturers.size,
    };
  }

  


//Função controladora dos campos da modal de cadastro
  const modalForm = [
    {
      id: 1,
      field: <InputText label='Modelo' description='Obrigatório' identifier='model' required={true} />
    },
    {
      id: 2,
      field: <InputText label='Fabricante' description='Obrigatório' identifier='manufacturer' required={true} />
    },
    {
      id: 3,
      field: <Dropdown label='Categoria' description='Obrigatório' identifier='categoryId' required={true} data={serializeCategories()} />
    },
    {
      id: 4,
      field: <TextArea label='Descrição' description='Opcional' identifier='description' required={false} />
    }
  ]


  return (
    <>
      <div className="equipment-container"> 
        <div className="count-equipment-container">
          <div className="count-container">
            <div className="count-name-container"> 
              Equipamentos Cadastrados
            </div>
            <div className="count-quantity-container">
              {getTotalEquipments()}  
            </div>
          </div>
          <div className="count-container">
            <div className="count-name-container"> 
              Fabricantes Cadastrados
            </div>
            <div className="count-quantity-container">
              {getTotalManufacturers().manufacturersCount}  
            </div>
          </div>
          <div className="count-container">
            <div className="count-name-container"> 
              Categorias Cadastradas
            </div>
            <div className="count-quantity-container">
              {getTotalCategories().categoriesCount}  
            </div>
          </div>  
        </div>

        <BasicTable 
          title="Equipamentos"
          subtitle="Listagem de Equipamentos" 
          columns={columns}
          data={serializeEquipaments()}
          createModal={
            <Modal 
              modalTitle="Cadastro de Equipamento" 
              modalForm={modalForm} 
              dialogModal={ { title: "Deseja continuar com o cadastro de Patrimônio desse Equipamento?", description: "Se continuar com o cadastro de Patrimônio todos os dados do Equipamento serão carregados automaticamente no formulário." } }
              action={equipamentsContext.write.equipaments}
            />
          }
        />
      </div>
    </>
  );
};

export default Equipamentos;