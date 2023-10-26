import styled from "styled-components";
import { StyledButton, StyledMiniCircleButton } from "../../styles/common";

const ImageUploadStyled = {
  StyledLabel: styled.label`
    ${StyledButton}
    display: inline-block;
    margin-right: 10px;
  `,

  PreviewSection: styled.section`
    & img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 5px;
    }
  `,

  ImagesUl: styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: 100%;
  `,

  ImageLi: styled.li`
    position: relative;
    height: 150px;
  `,

  DeleteButton: styled.button`
    ${StyledMiniCircleButton}
    position: absolute;
    top: 5px;
    right: 5px;
  `,

  ButtonSection: styled.section``,

  InvisibleInput: styled.input`
    display: none;
    &:disabled + label {
      text-decoration: line-through;
      cursor: default;
    }
  `,
};

export default ImageUploadStyled;
