import React from 'react'
import NoteCategory from '../NoteCategory/NoteCategory'
import styled from 'styled-components'
import { INoteCategories } from '@/types/post'
import arrow from '/public/assets/right-arrow.png'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
interface NoteSideBarProps {
  categories: INoteCategories
}

const NoteSideBar = ({ categories }: NoteSideBarProps) => {
  const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(false)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setIsMenuListOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [listRef, setIsMenuListOpen])

  return (
    <>
      <SideBarOpenButton
        onClick={() => setIsMenuListOpen(!isMenuListOpen)}
        isMenuListOpen={isMenuListOpen}
      >
        <Image src={arrow} alt="arrow" width={30} />
      </SideBarOpenButton>
      <NoteSideBarLayout isMenuListOpen={isMenuListOpen} ref={listRef}>
        {categories.map((category) => (
          <NoteCategory key={category.name} category={category} />
        ))}
      </NoteSideBarLayout>
    </>
  )
}

export default NoteSideBar

const NoteSideBarLayout = styled.ul<{ isMenuListOpen: boolean }>`
  border-right: 2px solid #eaeaea;

  max-width: 200px;
  min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media ${({ theme }) => theme.device.mobile} {
    padding-left: 25px;
    position: fixed;
    top: 0;
    transition: left 0.3s ease-in-out;
    z-index: 15;
    height: 100%;
    left: 0;
    left: ${({ isMenuListOpen }) => (isMenuListOpen ? '0' : `-200px`)};
    background-color: white;

    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 30px;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`

const SideBarOpenButton = styled.button<{ isMenuListOpen: boolean }>`
  background-color: white;
  border: none;
  display: none;

  @media ${({ theme }) => theme.device.mobile} {
    display: block;
    position: fixed;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    left: 0;
  }
`
