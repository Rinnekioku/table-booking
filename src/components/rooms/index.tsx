import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import { Room } from './components';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { useRooms } from '../../core/hooks/rooms';
import { RoomEntity } from './components/room';
import { renderBreadcrumb } from '../../core/constants/renderBreadcrumb';
import { Loader } from '../../core/constants/loader';
import { blockMargin, blocksJustify, errorAlign, loaderAlign, paginationAlign } from '../../core/constants/gridSettings';
import { ErrorBlock } from '../../core/constants/errorBlock';
import { itemsOnPage } from '../../core/constants/itemsOnPage';
import { PaginationSC } from '../../core/styles/pagination';
import { SearchBar } from '../searchbar';
import { useResponsiveGrid } from '../../core/hooks/responsive/useResponsiveGrid';

interface RoomsPropsEntity{
    routes: Route[],
}

export function Rooms(props: RoomsPropsEntity): JSX.Element {
    const [roomsState, t, page, onPageChange, total, searchBar, onSearchBarChange] = useRooms(); 
    const colSpan = useResponsiveGrid(); 

    if (roomsState.isLoading) {
        return (
            <>
                <PageHeader
                    title={t('rooms.title')}
                    breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                />
                <Row justify={loaderAlign}>
                    <Loader/>
                </Row>
            </>
        );
    } else {
        if (roomsState.error) {
            return (
                <>
                    <PageHeader
                        title={t('rooms.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row justify={errorAlign}>
                        <ErrorBlock errorText={t('rooms.noRoomsError')}/>
                    </Row>
                </>
            );
        } else {
            return (
                <>
                    <PageHeader
                        title={t('rooms.title')}
                        breadcrumb={{routes: props.routes, itemRender: renderBreadcrumb}}
                    />
                    <Row gutter={blockMargin} justify={blocksJustify}>
                        <Col span={24}>
                            <SearchBar onChange={onSearchBarChange} type='rooms'/>
                        </Col>
                        {roomsState.rooms.map((room: RoomEntity) => {
                            if (searchBar !== ''){
                                if (room.name.match(searchBar.trim())) {
                                    return (
                                        <Col span={colSpan} key={room.id}>
                                            <Room
                                                name={room.name} 
                                                id={room.id}
                                            />
                                        </Col>
                                    );
                                } else {
                                    return null;
                                }
                            } else {
                                return (
                                    <Col span={colSpan} key={room.id}>
                                        <Room
                                            name={room.name} 
                                            id={room.id}
                                        />
                                    </Col>
                                ); 
                            }
                            
                        })}
                    </Row>
                    
                    <Row justify={blocksJustify} align={paginationAlign}>
                        <PaginationSC
                            current={page}
                            defaultPageSize={itemsOnPage}
                            showSizeChanger={false}
                            onChange={onPageChange}
                            total={total}
                        />
                    </Row>
                </>
            );
        }
    }
}
