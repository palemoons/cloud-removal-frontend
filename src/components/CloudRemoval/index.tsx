import React, { useState } from 'react';
import styles from './index.module.less';
import Arrow from '@/assets/arrow_right.svg';
import Loading from '@/assets/loading.svg';
import cloud from '@/assets/test.jpg';

const CloudRemoval = () => {
  const [isHandle, setIsHandle] = useState(false);
  return (
    <div className={styles.content}>
      <Upload />
      {isHandle ? <Loading className={styles.loading} /> : <Arrow />}
      <Download />
    </div>
  );
};

const Upload = () => {
  const [input, setInput] = useState('');
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const reader = new FileReader();
    file && reader.readAsDataURL(file[0]);
    reader.onload = () => {
      setInput(reader.result as string);
    };
  };
  return (
    <div className={styles.input_container}>
      <div className={styles.input_container_content}>
        {input ? (
          <img src={input} />
        ) : (
          <div className={styles.input_container_content_button}>
            <div>点击上传图片</div>
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>
        )}
      </div>
      <div className={styles.button_container}>
        <div className={styles.button}>去云</div>
      </div>
    </div>
  );
};

const Download = () => {
  const [output, setOutput] = useState(cloud);
  return (
    <div className={styles.output_container}>
      <div className={styles.output_container_content}>
        {output ? <img src={output} /> : '暂无内容'}
      </div>
      <div className={styles.button_container}>
        <a className={styles.button} download="output.jpg" href={cloud}>
          下载
        </a>
      </div>
    </div>
  );
};

export default CloudRemoval;
