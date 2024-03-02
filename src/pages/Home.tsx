import React, { useState, useEffect } from 'react';
import { Carousel, Button, Drawer, Divider } from 'antd';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { CountDown } from '../components/CountDown';
import { CreateCard } from '../components/CreateCard';
import { LessonsList } from '../components/LessonsList';
import { ShowCards } from '../components/ShowCards';
import { useHomeContext } from '../context/HomeContext';

export function Home () {
  const { words, countDown, openMenu, setOpenMenu, setAddCart, addCart, getLesson } = useHomeContext();

  return (
    <div className="w-full h-full">
      <CountDown />
      <div className="absolute top-2 right-2 z-10">
        <Button icon={<MenuOutlined />} onClick={() => setOpenMenu(true)}></Button>
      </div>
      <Drawer title="Chọn bài học" onClose={() => setOpenMenu(false)} open={openMenu} size="default">
        <Button icon={<PlusOutlined />} onClick={() => setAddCart(true)}>Tạo bài học</Button>
        <Divider plain orientation="left" className="uppercase"><span className="font-bold">Bài học đã tạo</span></Divider>
        <LessonsList />
        <Drawer title="Tạo bài học" closable={false} onClose={() => setAddCart(false)} open={addCart}>
          <CreateCard />
        </Drawer>
      </Drawer>
      <ShowCards />
    </div>
  )
}
