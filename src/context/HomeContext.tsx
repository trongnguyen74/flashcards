import React, { useState, createContext, useContext } from 'react';
import { ReactNode } from 'react';
import supabase from '../api/Supabase';

interface ContextType {
  words: string;
  setWords: (words: string) => void;
  countDown: boolean;
  setCountDown: (value:boolean) => void;
  openMenu: boolean;
  setOpenMenu: (value:boolean) => void;
  addCart: boolean;
  setAddCart: (value:boolean) => void;
  getLesson: (id:number) => void;
  lesson: any;
  getLessonsList: () => void;
  isLessons: boolean;
  lessons: any;
}

interface ProviderType {
  children: ReactNode;
}

const Context = createContext({} as ContextType);

export function useHomeContext() {
  return useContext(Context);
}

export function HomeProvider ({ children }: ProviderType) {
  const [words, setWords] = useState('');
  const [countDown, setCountDown] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [lesson, setLesson] = useState<any>({});
  const [lessons, setLessons] = useState<any>([]);
  const [isLessons, setIsLessons] = useState(false);

  const getLessonsList = async () => {
    let { data, error } = await supabase
      .from('cards')
      .select('*')
    if(error){
      console.log(error);
    }
    else{
      setLessons(data);
      setIsLessons(true);
    }
  }

  const getLesson = async(id:number) => {
    if(id == -1){
      setLesson([]);
    }
    else{
      let { data, error } = await supabase
        .from('cards')
        .select('*').eq('id', id)
      if(error){
        console.log(error);
      }
      else{
        setLesson(data?.[0]);
      }
    }
  }

  return (
    <Context.Provider
      value={
        {
          words, setWords, countDown, setCountDown,
          openMenu, setOpenMenu, addCart, setAddCart, getLesson, lesson,
          getLessonsList, isLessons, lessons
        }
      }
    >
      { children }
    </Context.Provider>
  )
}
