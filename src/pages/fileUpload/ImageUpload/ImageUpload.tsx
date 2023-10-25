import React, { useState } from "react";
import styled from "styled-components";

const ImageUpload = () => {
  const [image, setImage] = useState<File | null>(null); // 단일 업로드
  const [images, setImages] = useState<File[]>([]); // 복수 업로드
  const [previewImage, setPreviewImage] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const limit = 10; // 이미지 최대 업로드 개수

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const multiple = e.target.multiple;

    switch (multiple) {
      case false:
        const selectImage = e.target.files![0];
        setImage(selectImage);
        previewImageGenerator(true, [selectImage]);
        break;

      case true:
        const selectImages = e.target.files!;
        const newFiles = [...Array.from(selectImages)].slice(0, limit - images.length);
        setImages([...images, ...newFiles]);
        previewImageGenerator(false, newFiles);
        break;
    }
  };

  const previewImageGenerator = (type = true, files: File[]) => {
    const images: string[] = (!type && previewImages) || []; // 기존 이미지에 새 이미지 추가
    const newImages = [];

    for (const file of files) {
      let previewImageUrl = URL.createObjectURL(file);
      newImages.push(previewImageUrl);
    }

    if (type) {
      // 1장일 때
      setPreviewImage(newImages[0]);
    } else {
      // 여러장일 때
      setPreviewImages([...images, ...newImages].splice(0, limit));
    }
  };

  return (
    <>
      <h2>이미지 업로드</h2>

      <ButtonSection>
        <InvisibleInput id="single_image" type="file" accept="image/*" onChange={handleClick} />
        <StyledLabel htmlFor="single_image">{`업로드(${image ? 1 : 0}개)`}</StyledLabel>
        <InvisibleInput
          id="multiple_images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleClick}
          disabled={images.length >= limit}
        />
        <StyledLabel htmlFor="multiple_images">{`업로드(${images.length}개)`}</StyledLabel>
      </ButtonSection>

      <PreviewSection>
        <ImagesUl>
          {previewImage ? (
            <ImageLi key={"upload_image_0"}>
              <img src={previewImage} alt="사용자 등록 이미지" />
            </ImageLi>
          ) : (
            <span>등록된 이미지가 없습니다.</span>
          )}

          {previewImages.length ? (
            previewImages.map((item, idx) => {
              return (
                <ImageLi key={`upload_image_${idx + 1}`}>
                  <img src={item} alt={`사용자 등록 이미지 ${idx}번`} />
                </ImageLi>
              );
            })
          ) : (
            <span>등록된 이미지가 없습니다.</span>
          )}
        </ImagesUl>
      </PreviewSection>
    </>
  );
};

export default ImageUpload;

const StyledLabel = styled.label`
  display: inline-block;
  width: 100px;
  height: 30px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #333;
  border-radius: 5px;
  text-align: center;
  line-height: 18px;
  cursor: pointer;
`;

const PreviewSection = styled.section`
  & img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const ImagesUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ImageLi = styled.li`
  height: 150px;
`;

const ButtonSection = styled.section``;

const InvisibleInput = styled.input`
  display: none;
  &:disabled + ${StyledLabel} {
    text-decoration: line-through;
    cursor: default;
  }
`;
