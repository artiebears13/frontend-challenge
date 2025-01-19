import {makeAutoObservable, runInAction} from 'mobx';
import {ICat} from "../types/types";

class CatsStore {
    cats: ICat[] = [];

    page: number = 1;
    limit: number = 20;
    totalPages = 20;
    isLoading: boolean = false;


    favoriteIds: string[] = [];
    favoriteCats: ICat[] = [];

    private readonly apiKey: string = import.meta.env.VITE_CAT_API_KEY;

    constructor() {
        makeAutoObservable(this);

        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            this.favoriteIds = JSON.parse(savedFavorites);
        }
    }

    async fetchCats() {
        try {
            this.isLoading = true;
            // @ts-ignore
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/search?limit=${this.limit}&page=${this.page}`,
                {headers: new Headers({ 'x-api-key': this.apiKey }),}
            );
            const data = await response.json();

            if (Array.isArray(data)) {
                const newCats: ICat[] = data.map((item: ICat) => (item));

                runInAction(() => {
                    this.cats = [...this.cats, ...newCats];
                    this.page += 1;
                });
            } else {
                runInAction(() => {
                    this.totalPages = 0;
                });
            }
        } catch (error) {
            console.error('Failed to fetch cats:', error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async fetchCatById(catId: string): Promise<ICat | null> {
        try {
            // @ts-ignore
            const response = await fetch(
                `https://api.thecatapi.com/v1/images/${catId}`,
                {headers: new Headers({'x-api-key': this.apiKey})}
            );
            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                console.error('CatsApi responded with an error:', data.Error);
                return null;
            }
        } catch (error) {
            console.error('Failed to fetch Cat details', error);
            return null;
        }
    }

    async fetchFavoriteCats() {
        const idsToFetch = this.favoriteIds;

        if (idsToFetch.length === 0) {
            return;
        }

        const promises: Promise<ICat|null>[] = idsToFetch.map((id) => this.fetchCatById(id));
        const results: (ICat|null)[] = await Promise.all(promises);

        const newCat = results.filter((m) => m) as ICat[];
        const existingIds = new Set(this.favoriteCats.map((f) => f.id));
        const unique = newCat.filter((m) => !existingIds.has(m.id));

        if (newCat.length > 0) {
            runInAction(() => {
                this.favoriteCats = [...this.favoriteCats, ...unique];
            });
        }
    }

    toggleFavorite(catId: string) {
        if (this.favoriteIds.includes(catId)) {
            this.favoriteIds = this.favoriteIds.filter((id) => id !== catId);
            this.favoriteCats = this.favoriteCats.filter((m) => m.id !== catId);

        } else {
            this.favoriteIds.push(catId);
        }

        localStorage.setItem('favorites', JSON.stringify(this.favoriteIds));
    }

    isFavorite(catId: string): boolean {
        return this.favoriteIds.includes(catId);
    }
}

export const catsStore = new CatsStore();


