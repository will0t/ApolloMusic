import React from 'react';
import '../css/sharelink.css';
import {
  EmailShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon
} from "react-share";

class Sharelink extends React.Component {
    render() {
        // Variable Declaration
        var shareUrl = `http://localhost:3000/invite/${this.props.contractId}`

        var title = `Hey ${this.props.receiver}, ${this.props.sender} has shared a Smart Contract with you`
        var body = "You can find the link to the smart contract below."

        return (
            <div className = "sharelink-wrapper">
              <h2>Share the link to the Smart Contract </h2>
              <div>The recipient must accept the invitation for the Smart Contract to be succesfully deployed on the blockchain network</div>

              <div className="social-wrapper">
                Share via Whatsapp:&nbsp;
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className = "social-share-button"
                >
                <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="social-wrapper">
                Share via Email:&nbsp;
                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body={body}
                  className = "social-share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
              <div>
                Share Link: {shareUrl}
              </div>
              

            </div>
        )
    }
}

export default Sharelink;
