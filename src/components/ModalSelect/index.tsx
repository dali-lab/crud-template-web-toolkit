import React, { useEffect, useRef, useState, RefObject } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getAllBreeds, getRandomPhotoByDogBreed } from '../../redux/slices/dogSlice';
import { AiOutlineReload } from 'react-icons/ai';
import './styles.scss';

export function ModalSelect() {
  const { selectedBreed, allDogBreeds } = useAppSelector((state) => state.dogs);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>(selectedBreed);
  const [display, setDisplay] = useState<boolean>(false);
  const ref: RefObject<any> = useRef(null);

  useEffect(() => {
    dispatch(getAllBreeds())
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent) => {
    const { current: wrap } = ref;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  return (
    <div ref={ref} className="modal-select">
      <input
        className="input"
        onClick={() => setDisplay(!display)}
        placeholder="Type to search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <AiOutlineReload
        className="button"
        onClick={() => dispatch(getRandomPhotoByDogBreed(search))}
        style={{fontSize: '20'}}
      />
      {display && 
        <div className="dropdown-container">
          {allDogBreeds
            .filter((name) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSearch(value);
                    setDisplay(false);
                  }}
                  className="dropdown-item"
                >
                  {value}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  );
}