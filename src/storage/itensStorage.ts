import AsyncStorage from '@react-native-async-storage/async-storage'
import {FilterStatus} from '@/types/FilterStatus';

const ITENS_STORAGE_KEY = '@listacompras:itens'

export type ItemStorage = {
    id: string, // sequencia de caracter randomica
    status: FilterStatus,
    description: string
}

//função base para consulta de dados
async function get(): Promise<ItemStorage[]> {
    try{
        const storage = await AsyncStorage.getItem(ITENS_STORAGE_KEY)
        return storage ? JSON.parse(storage) : []

    }catch(error){
        throw new Error("ITEM_GET: " + error)
    }
}

async function save(itens:ItemStorage[]): Promise<void> {
    try{
        await AsyncStorage.setItem(ITENS_STORAGE_KEY, JSON.stringify(itens))
        return 

    }catch(error){
        throw new Error("ITEM_SAVE: " + error)
    }
}