import React, { useMemo } from 'react';
import { inPageProviderIconSwitcher, NOT_SUPPORTED_WALLETS_LINKS, WALLET_KEYS_TO_NAME } from 'constants/wallet';
import { browserDetect, getMobileOperatingSystem } from 'services/walletService';

import './ConnectWalletNoProvider.scss';

let wallets = [...Object.keys(NOT_SUPPORTED_WALLETS_LINKS.browser), ...Object.keys(NOT_SUPPORTED_WALLETS_LINKS.mobile)];
wallets = [...new Set(wallets)];

const ConnectWalletNoProvider = () => {
  const [mobileSystem, mobileDetected] = useMemo(() => {
    const mobileSystemLoc = getMobileOperatingSystem();
    return [mobileSystemLoc, mobileSystemLoc !== 'unknown'];
  }, []);

  const browserName = useMemo(() => browserDetect(), []);

  return (
    <div className="no-wallet-provider-wrapper">
      {
        mobileDetected && (
          <div className="suggestions-container mobile">
            <div className="title">
              <div className="title-item">
                We have noticed that you are using an {mobileSystem} device but have not found
                a connection to a wallet
              </div>

              <div className="title-item">
                Please use one of the supported {mobileSystem} wallets and try again
              </div>
            </div>

            <div className="suggestions-wrapper">
              {
                Object.keys(NOT_SUPPORTED_WALLETS_LINKS.mobile).map((walletName) => {
                  const walletData = useMemo(() => NOT_SUPPORTED_WALLETS_LINKS.mobile[walletName], [walletName]); // eslint-disable-line
                  const walletLabel = useMemo(() => WALLET_KEYS_TO_NAME[walletName], [walletName]); // eslint-disable-line
                  const Icon = useMemo(() => inPageProviderIconSwitcher(walletLabel), [walletLabel]); // eslint-disable-line

                  if (!walletData[mobileSystem]) return null;

                  return (
                    <div key={walletName} className="wallet-wrapper">
                      <div className="icon-name-wrapper">
                        <Icon />
                        <div className="name">{walletLabel}</div>
                      </div>

                      <ul className="options-wrapper">
                        <li className="option">
                          <a className="option-link" target="_blank" rel="noopener noreferrer" href={walletData[mobileSystem]}>
                            {walletData[mobileSystem]}
                          </a>
                        </li>
                      </ul>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )
      }

      {
        !mobileDetected && (
          <div className="suggestions-container mobile">
            {
              !browserName && (
                <>
                  <div className="title">
                    <div className="title-item">
                      You are using an unsupported browser and we were not able to find any compatible
                      wallets for your browser
                    </div>

                    <div className="title-item">
                      Please install one of the wallet apps or browser extensions with their browser
                      from the list bellow and try again
                    </div>
                  </div>

                  <div className="suggestions-wrapper">
                    {
                      wallets.map((wallet) => {
                        const walletLabel = useMemo(() => WALLET_KEYS_TO_NAME[wallet], [wallet]); // eslint-disable-line
                        const Icon = useMemo(() => inPageProviderIconSwitcher(walletLabel), [walletLabel]); // eslint-disable-line

                        return (
                          <div key={wallet} className="wallet-wrapper">
                            <div className="icon-name-wrapper">
                              <Icon />
                              <div className="name">{walletLabel}</div>
                            </div>

                            <ul className="options-wrapper">
                              {
                                ['Chrome', 'Firefox', 'Brave', 'Edge'].map((browserName) => {
                                  const walletBrowserData = NOT_SUPPORTED_WALLETS_LINKS.browser[wallet]
                                    && NOT_SUPPORTED_WALLETS_LINKS.browser[wallet][browserName];

                                  if (!walletBrowserData) return null;

                                  return (
                                    <li className="option" key={`${wallet}-${browserName}`}>
                                      <a
                                        className="option-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={walletBrowserData}
                                      >
                                        ({browserName}) {walletBrowserData}
                                      </a>
                                    </li>
                                  );
                                })
                              }

                              {
                                ['Android', 'iOS'].map((osName) => {
                                  const walletAppData = NOT_SUPPORTED_WALLETS_LINKS.mobile[wallet]
                                    && NOT_SUPPORTED_WALLETS_LINKS.mobile[wallet][osName];

                                  if (!walletAppData) return null;

                                  return (
                                    <li className="option" key={`${wallet}-${osName}`}>
                                      <a
                                        className="option-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={walletAppData}
                                      >
                                        ({osName}) {walletAppData}
                                      </a>
                                    </li>
                                  );
                                })
                              }
                            </ul>
                          </div>
                        );
                      })
                    }
                  </div>
                </>
              )
            }

            {
              browserName && (
                <>
                  <div className="title">
                    <div className="title-item">
                      We have noticed that you are using the {browserName} but have not found
                      a connection to a wallet
                    </div>

                    <div className="title-item">
                      Please install one of the supported {browserName} extensions and try again
                    </div>
                  </div>

                  <div className="suggestions-wrapper">
                    {
                      Object.keys(NOT_SUPPORTED_WALLETS_LINKS.browser).map((walletName) => {
                        const walletData = useMemo(() => NOT_SUPPORTED_WALLETS_LINKS.browser[walletName], [walletName]); // eslint-disable-line
                        const walletLabel = useMemo(() => WALLET_KEYS_TO_NAME[walletName], [walletName]); // eslint-disable-line
                        const Icon = useMemo(() => inPageProviderIconSwitcher(walletLabel), [walletLabel]); // eslint-disable-line

                        if (!walletData[browserName]) return null;

                        return (
                          <div key={walletName} className="wallet-wrapper">
                            <div className="icon-name-wrapper">
                              <Icon />
                              <div className="name">{walletLabel}</div>
                            </div>

                            <ul className="options-wrapper">
                              <li className="option">
                                <a
                                  className="option-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={walletData[browserName]}
                                >
                                  {walletData[browserName]}
                                </a>
                              </li>
                            </ul>
                          </div>
                        );
                      })
                    }
                  </div>
                </>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default ConnectWalletNoProvider;
