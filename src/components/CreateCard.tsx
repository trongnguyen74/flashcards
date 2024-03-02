import React, { useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Card, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import cloudinary from '../api/Cloudinary';
import supabase from '../api/Supabase';
import { useHomeContext } from '../context/HomeContext';

export function CreateCard() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { setAddCart, getLessonsList } = useHomeContext();

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }

  const onFinish = async (values: any) => {
      message.warning('Đang tạo bài học...');

      const newLesson:any = {
        name: '',
        cards: []
      };

      newLesson.name = values.name;

      let { cards } = values;

      for(var i=0; i<cards.length; i++){
        let{ image } = cards[i];
        newLesson.cards[i] = {};
        if(image){
          let { fileList } = image;
          let { originFileObj } = fileList[0];
          let imageUrl = await cloudinary(originFileObj);
          newLesson.cards[i].image = {'status': 'done', 'url': imageUrl};
        }
        let{ word } = cards[i];
        newLesson.cards[i].word = word;
      }

      const { error } = await supabase
        .from('cards')
        .insert([newLesson])
        .select()

      if(error){
        console.log(error);
      }

      getLessonsList();
      message.success('Đã thêm bài học thành công');
      setAddCart(false);
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Nhập tên bài học' }]}
      >
        <Input placeholder="Tên bài học"/>
      </Form.Item>
      <Form.List name="cards">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card key={key} hoverable className="my-4" size="small">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <Form.Item
                      {...restField}
                      name={[name, 'word']}
                      rules={[{ required: true, message: 'Nhập từ vựng' }]}
                    >
                      <Input placeholder="Từ vựng" className="w-[250px]"/>
                    </Form.Item>
                    <Button icon={<DeleteOutlined />} onClick={() => remove(name)}></Button>
                  </div>
                  <Form.Item
                    name={[name, 'image']}
                    rules={[{ required: false}]}
                  >
                    <Upload
                      beforeUpload={() => false}
                      listType="picture-card"
                      onChange={handleChange}
                      maxCount={1}
                    >
                      <button style={{ border: 0, background: 'none' }} type="button" >
                        <PlusOutlined />
                        <div className="mt-[8px]">Upload</div>
                      </button>
                    </Upload>
                  </Form.Item>
                </div>
              </Card>
            ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm card
                </Button>
              </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )
}
