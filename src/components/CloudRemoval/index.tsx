import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { HttpRequest } from '@/utils/HttpRequest';
import Arrow from '@/assets/arrow_right.svg';
import Loading from '@/assets/loading.svg';

const CloudRemoval = () => {
  const [isHandle, setIsHandle] = useState(false);
  const [output, setOutput] = useState('');

  const removeCloud = async (img: File) => {
    setIsHandle(true);
    let formData = new FormData();
    formData.append('image', img);
    const response = await HttpRequest(
      'http://127.0.0.1:5000/predict',
      'POST',
      formData
    );
    if (response) {
      setOutput('data:image/jpeg;base64, ' + response);
    }
    setIsHandle(false);
  };

  return (
    <div className={styles.content}>
      <Upload removeCloud={removeCloud} />
      {isHandle ? <Loading className={styles.loading} /> : <Arrow />}
      <Download output={output} />
    </div>
  );
};

const Upload = (props: { removeCloud: (img: File) => void }) => {
  const [input, setInput] = useState('');
  const [upload, setUpload] = useState<File>();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    file && setUpload(file[0]);
    const reader = new FileReader();
    file && reader.readAsDataURL(file[0]);
    reader.onload = () => {
      setInput(reader.result as string);
    };
  };

  const handleClick = () => {
    upload && props.removeCloud(upload);
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
        <div className={styles.button} onClick={handleClick}>
          去云
        </div>
      </div>
    </div>
  );
};

const Download = (props: { output: string }) => {
  return (
    <div className={styles.output_container}>
      <div className={styles.output_container_content}>
        {props.output ? (
          <img src={props.output} style={{ width: '100%', height: '100%' }} />
        ) : (
          '暂无内容'
        )}
      </div>
      <div className={styles.button_container}>
        <a className={styles.button} download="output.jpg" href={props.output}>
          下载
        </a>
      </div>
    </div>
  );
};

export default CloudRemoval;
