import WebRtcAdapter from 'webrtc-adapter'

var sendChannel;
var receiveChannel;

class Connection {

	constructor({dataChannelSend, dataChannelReceive, startButton, sendButton, closeButton}) {
		this.dataChannelSend = dataChannelSend
		this.dataChannelReceive = dataChannelReceive
		this.startButton = startButton
		this.sendButton = sendButton
		this.closeButton = closeButton

		this.startButton.onclick = () => this.createConnection()
		this.sendButton.onclick = () => this.sendData()
		this.closeButton.onclick = () => this.closeDataChannels()

		this.pcConstraint = null
		this.dataConstraint = null

		this.localConnection = undefined
		this.remoteConnection = undefined

		this.sendChannel = undefined
		this.receiveChannel = undefined
	}

	enableStartButton() {
		this.startButton.disabled = false;
	}

	disableSendButton() {
		this.sendButton.disabled = true;
	}

	createConnection() {
		this.dataChannelSend.placeholder = '';
		var servers = null;
		trace('Using SCTP based data channels');
		// For SCTP, reliable and ordered delivery is true by default.
		// Add localConnection to global scope to make it visible
		// from the browser console.
		window.localConnection = this.localConnection =
				new RTCPeerConnection(servers, this.pcConstraint);
		trace('Created local peer connection object localConnection');

		this.sendChannel = this.localConnection.createDataChannel('sendDataChannel', this.dataConstraint);
		trace('Created send data channel');

		this.localConnection.onicecandidate = e => this.iceCallback1(e)
		this.sendChannel.onopen = e => this.onSendChannelStateChange(e)
		this.sendChannel.onclose = e => this.onSendChannelStateChange(e)

		// Add remoteConnection to global scope to make it visible
		// from the browser console.
		window.remoteConnection = this.remoteConnection =
				new RTCPeerConnection(servers, this.pcConstraint);
		trace('Created remote peer connection object remoteConnection');

		this.remoteConnection.onicecandidate = e => this.iceCallback2(e)
		this.remoteConnection.ondatachannel = e => this.receiveChannelCallback(e)

		this.localConnection.createOffer().then(
			e => this.gotDescription1(e),
			e => this.onCreateSessionDescriptionError(e)
		)
		this.startButton.disabled = true;
		this.closeButton.disabled = false;
	}


	onCreateSessionDescriptionError(error) {
		trace('Failed to create session description: ' + error.toString());
	}

	sendData() {
		const data = this.dataChannelSend.value;
		this.sendChannel.send(data);
		trace('Sent Data: ' + data);
	}

	closeDataChannels() {
		trace('Closing data channels');
		this.sendChannel.close();
		trace('Closed data channel with label: ' + this.sendChannel.label);
		this.receiveChannel.close();
		trace('Closed data channel with label: ' + this.receiveChannel.label);
		this.localConnection.close();
		this.remoteConnection.close();
		this.localConnection = null;
		this.remoteConnection = null;
		trace('Closed peer connections');
		this.startButton.disabled = false;
		this.sendButton.disabled = true;
		this.closeButton.disabled = true;
		this.dataChannelSend.value = '';
		this.dataChannelReceive.value = '';
		this.dataChannelSend.disabled = true;
		this.disableSendButton();
		this.enableStartButton();
	}

	gotDescription1(desc) {
		this.localConnection.setLocalDescription(desc);
		trace('Offer from localConnection \n' + desc.sdp);
		this.remoteConnection.setRemoteDescription(desc);
		this.remoteConnection.createAnswer().then(
			e => this.gotDescription2(e),
			e => this.onCreateSessionDescriptionError(e)
		);
	}

	gotDescription2(desc) {
		this.remoteConnection.setLocalDescription(desc);
		trace('Answer from remoteConnection \n' + desc.sdp);
		this.localConnection.setRemoteDescription(desc);
	}


	iceCallback1(event) {
		trace('local ice callback');
		if (event.candidate) {
			this.remoteConnection.addIceCandidate(
				event.candidate
			).then(
				e => this.onAddIceCandidateSuccess(e),
				e => this.onAddIceCandidateError(e)
			);
			trace('Local ICE candidate: \n' + event.candidate.candidate);
		}
	}

	iceCallback2(event) {
		trace('remote ice callback');
		if (event.candidate) {
			this.localConnection.addIceCandidate(
				event.candidate
			).then(
				() => this.onAddIceCandidateSuccess(),
				() => this.onAddIceCandidateError()
			);
			trace('Remote ICE candidate: \n ' + event.candidate.candidate);
		}
	}


	onAddIceCandidateSuccess() {
		trace('AddIceCandidate success.');
	}

	onAddIceCandidateError(error) {
		trace('Failed to add Ice Candidate: ' + error.toString());
	}

	receiveChannelCallback(event) {
		trace('Receive Channel Callback')
		this.receiveChannel = event.channel
		this.receiveChannel.onmessage = e => this.onReceiveMessageCallback(e)
		this.receiveChannel.onopen = e => this.onReceiveChannelStateChange(e)
		this.receiveChannel.onclose = e => this.onReceiveChannelStateChange(e)
	}

	onReceiveMessageCallback(event) {
		trace('Received Message');
		this.dataChannelReceive.value = event.data;
	}

	onSendChannelStateChange() {
		const readyState = this.sendChannel.readyState;
		trace('Send channel state is: ' + readyState);
		if (readyState === 'open') {
			this.dataChannelSend.disabled = false;
			this.dataChannelSend.focus();
			this.sendButton.disabled = false;
			this.closeButton.disabled = false;
		} else {
			this.dataChannelSend.disabled = true;
			this.sendButton.disabled = true;
			this.closeButton.disabled = true;
		}
	}

	onReceiveChannelStateChange() {
		const readyState = this.receiveChannel.readyState;
		trace('Receive channel state is: ' + readyState);
	}

}


function trace(text) {
	if (text[text.length - 1] === '\n') {
		text = text.substring(0, text.length - 1);
	}
	if (window.performance) {
		var now = (window.performance.now() / 1000).toFixed(3);
		console.log(now + ': ' + text);
	} else {
		console.log(text);
	}
}

export default Connection
