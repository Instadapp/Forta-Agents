
const BigNumber = require("bignumber.js");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");
const { provideHandleTransaction } = require("./agent");

const {
    DAI_ADDRESS,
    TRANSFER_EVENT,
    DAI_DECIMALS,
    USDC_ADDRESS,
    USDC_DECIMALS
} = require("./constants");

describe("large transfer event agent", () => {
    let handleTransaction;
    const mockAmountThreshold = "1000";
    const mockTxEvent = {
        filterLog: jest.fn(),
    };

    beforeAll(() => {
        handleTransaction = provideHandleTransaction(mockAmountThreshold);
    });

    beforeEach(() => {
        mockTxEvent.filterLog.mockReset();
    });



    it("returns empty findings if there are no transfer events", async () => {

        mockTxEvent.filterLog.mockReturnValue([]);
        const findings = await handleTransaction(mockTxEvent);
        // console.log("findings", findings)
        expect(findings).toStrictEqual([]);
    });

    it("returns empty findings if there are large token transfer events but no dsa address is involved", async () => {
        const amount = new BigNumber("1001");
        const formattedAmount = amount.toFixed(2);
        const mockDaiTransferEvent = {
            args: {
                from: "0x80f36f504c63b7663cebcdecb2ae7620a1fcb6e1",
                to: "0x6b175474e89094c44da98b954eedeac495271d0f",
                value: amount.multipliedBy(10 ** DAI_DECIMALS),
            },
        };
        mockTxEvent.filterLog.mockReturnValueOnce([mockDaiTransferEvent]);
        mockTxEvent.filterLog.mockReturnValueOnce([]);

        const findings = await handleTransaction(mockTxEvent);

        expect(findings).toStrictEqual([]);
    });

    it("returns findings if there are large token transfer events involving dsa address", async () => {

        const amount = new BigNumber("1001");
        const formattedAmount = amount.toFixed(2);
        const mockDaiTransferEvent = {
            args: {
                from: "0xf151ed2caedbda83c17ae39d6990d92909fcf529", // dsa
                to: "0x4f58985b75eec8f14c536878a19eadf4a1960d6c",
                value: amount.multipliedBy(10 ** DAI_DECIMALS),
            },
        };
        mockTxEvent.filterLog.mockReturnValueOnce([mockDaiTransferEvent]);
        mockTxEvent.filterLog.mockReturnValueOnce([]);

        const findings = await handleTransaction(mockTxEvent);

        expect(findings).toStrictEqual([
            Finding.fromObject({
                name: "Large DAI Transfer",
                description: `${formattedAmount} DAI transferred from a dsa address`,
                alertId: "INST-41",
                severity: FindingSeverity.Info,
                type: FindingType.Info,
                metadata: {
                    from: mockDaiTransferEvent.args.from.concat("(dsa address)"),
                    to: mockDaiTransferEvent.args.to,
                    amount: formattedAmount,
                },
            }),
        ]);

    });



});