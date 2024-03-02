import React from 'react';
import { useHomeContext } from '../context/HomeContext';
import { Carousel } from 'antd';

export function ShowCards() {
  const { lesson } = useHomeContext();
  const { cards } = lesson;

  if(lesson.name){
    return (
      <Carousel>
        {
          cards.map((obj:any) => {
            return (
              <div className="h-[100vh]" key={obj.word}>
                <div className="flex items-center justify-center h-full">
                  <div className="flex justify-center w-1/2 text-[150px]">
                    {obj.word}
                  </div>
                  {
                    obj.image && (
                      <div className="flex justify-center w-1/2 px-4">
                        <img className="w-full h-full object-contain" src={obj.image.url}/>
                      </div>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </Carousel>
    )
  }
  else{
    return (
      <div className="flex items-center justify-center w-full h-full">
        Chọn bài học trong menu nhé!
      </div>
    );
  }
}
