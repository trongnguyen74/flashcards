import React, { useState, useEffect } from 'react';
import supabase from '../api/Supabase';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useHomeContext } from '../context/HomeContext';

export function LessonsList() {
  const [value, setValue] = useState();
  const { getLesson, setCountDown, setOpenMenu, getLessonsList, lessons, isLessons } = useHomeContext();

  useEffect(() => {
    getLessonsList();
  }, [])

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    getLesson(e.target.value);
    setCountDown(true);
    setOpenMenu(false);
  };

  return (
    <div>
      {
        isLessons && (
          <Radio.Group onChange={onChange} defaultValue={value} className="flex flex-col">
            {
              lessons.map((obj:any) => {
                return (
                  <Radio key={obj.id} value={obj.id}>{obj.name}</Radio>
                )
              })
            }
          </Radio.Group>
        )
      }
    </div>
  )
}
