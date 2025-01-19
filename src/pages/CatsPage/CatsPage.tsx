import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { catsStore } from '../../store/CatsStore.ts';
import CatCard from '../../components/CatCard/CatCard.tsx';
// @ts-ignore
import styles from "./CatsPage.module.scss"


const CatsPage: React.FC = observer(() => {
    const {
        isLoading,
        page,
        totalPages,
    } = catsStore;

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (catsStore.cats.length === 0) {
            catsStore.fetchCats().then();
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !isLoading && page <= totalPages) {
                    catsStore.fetchCats().then();
                }
            },
            {
                root: null,
                rootMargin: '600px',
                threshold: 0,
            }
        );
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [isLoading, page, totalPages]);

    return (
        <div className={styles.container}>
            <div
                className={styles.list}
               >
                {catsStore.cats.map((cat) => (
                    <CatCard key={cat.id} {...cat} />
                ))}

            </div>

            {isLoading && <div className={styles.loaderDiv}>...загружаем еще котиков...</div>}

            {page <= totalPages && (
                <div ref={loaderRef} className={styles.loaderPlaceholder} />
            )}
        </div>
    );
});

export default CatsPage;
