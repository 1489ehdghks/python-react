import React, { useState, useEffect, useRef } from "react";
import { Pagination } from 'antd';
import "./GameHistoryPage.scss"

const GameHistoryPage = () => {
    const [games, setGames] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGame, setCurrentGame] = useState(games.length);
    const pageSize = 8;
    const totalgames = games.length;
    const currentgames = games.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const prevPageRef = useRef();

    useEffect(() => {
        fetch('http://localhost:5000/game', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setGames(data);
                console.log("data:", data)
                console.log("games:", games)
            })

            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, [currentPage, currentGame]);

    useEffect(() => {
        prevPageRef.current = currentPage

    }, [currentPage])

    useEffect(() => {
        setCurrentGame(games.length);
    }, [games])



    const handlePageChange = page => {
        setCurrentPage(page);
    };
    return (
        <main>
            <div id="game-gallery">
                <h1>가위바위보 전적</h1>
                <table className="game-history-table">
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>컴퓨터</th>
                            <th>사용자</th>
                            <th>결과</th>
                            <th>시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentgames.map((game, index) => (
                            <tr key={index}>
                                <td>{game.username}</td>
                                <td className="emoji">{game.computer_choice}</td>
                                <td className="emoji">{game.user_choice}</td>
                                <td>{game.result}</td>
                                <td>{game.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                    current={currentPage}
                    total={totalgames}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </div>
        </main>
    )
}

export default GameHistoryPage