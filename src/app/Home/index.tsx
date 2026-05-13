import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input/index';
import { Filter } from '@/components/Filter';
import { Button } from '@/components/Button'


import { style } from './style';
import { FilterStatus } from '@/types/FilterStatus';
import { ItemStorage } from '@/storage/itensStorage';


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [itens, setItens] = useState<ItemStorage[]>([])

  function fnAdicionarItem(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }
    const novoItem = {
      id: Math.random().toString(36),
      description: description, 
      status: FilterStatus.PENDING
    }
    setItens([...itens, novoItem])
  }

  return (
    <View style={style.container}>
      <Image source={require('@/assets/logo.png')} style={style.logo} />

      <View style={style.form}>
        <Input
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" onPress={fnAdicionarItem}/>
      </View>

      <View style={style.content}>
        <View style={style.header}>


          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}

            />
          ))}

          <TouchableOpacity style={style.clearButton}>
            <Text style={style.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* os itens estão aqui !!! */}
        <FlatList
          data={itens}
          renderItem={({item})=>(
            <Item data={item} />
          )}
          ListEmptyComponent={()=> 
            <Text style={style.empty}>Nenhum item encontrado!</Text>
          }
          ItemSeparatorComponent={() => <View style={style.separator} />}
          contentContainerStyle={style.listContent}
          showsVerticalScrollIndicator={false}
        />

      </View>

    </View>
  );
}


