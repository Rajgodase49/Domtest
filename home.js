import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [ip, setIp] = useState('');
  const [data, setData] = useState({});

  const ipStore = (e) => {
    setIp(e.target.value);
  };

  const getIPAddress = async () => {
    try {
      const { RTCPeerConnection } = window;
      const peerConnection = new RTCPeerConnection({ iceServers: [] });
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      const ipAddress = peerConnection.localDescription.sdp.match(/(?<=c=IN IP4 )[^ ]+/)[0];
      console.log(ipAddress);
      setIp(ipAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (ip) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIPAddress();
  }, []);

  return (
    <div>
      <input type='search' onChange={ipStore} placeholder='Enter your IP address' />
      <button type='button' onClick={fetchData}>
        Get Data
      </button>
    </div>
  );
};

export default Home;
