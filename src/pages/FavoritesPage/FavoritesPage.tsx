import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { catsStore } from '../../store/CatsStore.ts';
import CatCard from '../../components/CatCard/CatCard.tsx';
import styles from "../CatsPage/CatsPage.module.scss";

const FavoritesPage: React.FC = observer(() => {
    const {
        favoriteIds,
        favoriteCats
    } = catsStore;

    useEffect(() => {
        catsStore.fetchFavoriteCats().then();
    }, []);

    return (
        <div style={{ padding: 20 }}>

            {favoriteIds.length === 0 && (
                <p>Вы пока не добавили избранных котиков</p>
            )}

            <div
                className={styles.list}
            >
                {favoriteCats.map((cat) => (
                    <CatCard key={cat.id} {...cat} />
                ))}

            </div>
        </div>
    );
});

export default FavoritesPage;
