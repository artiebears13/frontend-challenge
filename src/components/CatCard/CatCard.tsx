import React, { useState } from 'react';
import { Tooltip } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import styles from './CatCard.module.scss';
import { catsStore } from '../../store/CatsStore.ts';
import { observer } from "mobx-react-lite";

interface CatCardProps {
    id: string;
    url: string;
}

const CatCard: React.FC<CatCardProps> = observer(({ id, url }) => {
    const isFav: boolean = catsStore.isFavorite(id);
    const [isHovered, setIsHovered] = useState(false);

    const handleToggleFavorite = () => {
        catsStore.toggleFavorite(id);
    };

    const renderIcon = () => {
        if (isHovered) {
            return isFav ? <HeartOutlined style={{ fontSize: 48, color: 'rgba(242, 78, 30, 1)' }} />
                : <HeartFilled style={{ fontSize: 48, color: 'rgba(242, 78, 30, 1)' }} />;
        } else {
            return isFav ? <HeartFilled style={{ fontSize: 48, color: 'rgba(242, 78, 30, 1)' }} />
                : <HeartOutlined style={{ fontSize: 48, color: 'rgba(242, 78, 30, 1)' }} />;
        }
    };

    return (
        <div className={styles.cardWrapper}>
            {url ? (
                <img alt={id} src={url} className={styles.posterImage} />
            ) : (
                <div className={styles.noPoster}>{id}</div>
            )}
            <div
                className={`${styles.favoriteIcon}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleToggleFavorite}
            >
                <Tooltip title={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}>
                    {renderIcon()}
                </Tooltip>
            </div>
        </div>
    );
});

export default CatCard;
