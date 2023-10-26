import React, { useState } from "react";
import Styled from "./ImageUploadStyled";

const ImageUpload = ({ limit }: { limit: number }) => {
  const [image, setImage] = useState<File | null>(null); // 단일 업로드
  const [images, setImages] = useState<File[]>([]); // 복수 업로드
  const [previewImage, setPreviewImage] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // 이미지 업로드
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // 이미지 삭제
  const deleteImage = (deleteImageIdx: number) => {
    // 파일 삭제
    setImages(images.filter((item, idx) => deleteImageIdx !== idx && item));

    // 미리보기 삭제
    setPreviewImages(previewImages.filter((item, idx) => deleteImageIdx !== idx && item));
  };

  // 미리보기 생성기
  const previewImageGenerator = (type = true, files: File[]) => {
    const images: string[] = (!type && previewImages) || []; // 기존 이미지에 새 이미지 추가
    const newImages: string[] = [];

    for (const file of files) {
      let previewImageUrl = URL.createObjectURL(file);
      newImages.push(previewImageUrl);
    }

    if (type) {
      // 단일
      setPreviewImage(newImages[0]);
    } else {
      // 복수
      setPreviewImages([...images, ...newImages].splice(0, limit));
    }
  };

  return (
    <>
      <h2>이미지 업로드</h2>

      <Styled.ButtonSection>
        <Styled.InvisibleInput id="single_image" type="file" accept="image/*" onChange={handleUpload} />
        <Styled.StyledLabel htmlFor="single_image">{`업로드(${image ? 1 : 0}개)`}</Styled.StyledLabel>
        <Styled.InvisibleInput
          id="multiple_images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={images.length >= limit}
        />
        <Styled.StyledLabel htmlFor="multiple_images">{`업로드(${images.length}개)`}</Styled.StyledLabel>
      </Styled.ButtonSection>

      <Styled.PreviewSection>
        <Styled.ImagesUl>
          {/* 이미지 등록 여부 */}
          {!previewImage && !previewImages.length && <span>등록된 이미지가 없습니다.</span>}

          {/* 단일 이미지 */}
          {previewImage && (
            <Styled.ImageLi key={"upload_image_0"}>
              <img src={previewImage} alt="사용자 등록 이미지" />
            </Styled.ImageLi>
          )}

          {/* 복수 이미지 */}
          {previewImages.length !== 0 &&
            previewImages.map((item, idx) => {
              return (
                <Styled.ImageLi key={`upload_image_${idx + 1}`}>
                  <Styled.DeleteButton onClick={() => deleteImage(idx)}>x</Styled.DeleteButton>
                  <img src={item} alt={`사용자 등록 이미지 ${idx}번`} />
                </Styled.ImageLi>
              );
            })}
        </Styled.ImagesUl>
      </Styled.PreviewSection>
    </>
  );
};

export default ImageUpload;
