import {FilterStatus} from '@/types/FilterStatus';

export type ItemStorage = {
    id: string, // sequencia de caracter randomica
    status: FilterStatus,
    description: string
}