const BigNumber = require("bignumber.js");
const { Finding, FindingSeverity, FindingType } = require("forta-agent");
const { provideHandleTransaction } = require("./agent");
const {
  INST_ADDRESS,
  TRANSFER_EVENT,
  INST_DECIMALS,
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
    mockTxEvent.filterLog.mockReturnValueOnce([]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([]);
    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
      TRANSFER_EVENT,
      INST_ADDRESS
    );
  });

  it("returns findings if there are large transfer events", async () => {
    const amount = new BigNumber("1001");
    // console.log(amount);
    const formattedAmount = amount.toFixed(2);

    const mockInstTransferEvent = {
      args: {
        from: "0x123",
        to: "0xabc",
        value: amount.multipliedBy(10 ** INST_DECIMALS),

      },
    };
    mockTxEvent.filterLog.mockReturnValueOnce([mockInstTransferEvent]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([
      Finding.fromObject({
        name: "Large INST Transfer",
        description: `${formattedAmount} INST transferred`,
        alertId: "INST-31",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          from: mockInstTransferEvent.args.from,
          to: mockInstTransferEvent.args.to,
          amount: formattedAmount,
        },
      }),
    ]);
    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
      TRANSFER_EVENT,
      INST_ADDRESS
    );
  });
  it("returns empty findings if there are transfer events less than threshold", async () => {
    const amount = new BigNumber("999");
    // console.log(amount);
    const formattedAmount = amount.toFixed(2);

    const mockInstTransferEvent = {
      args: {
        from: "0x123",
        to: "0xabc",
        value: amount.multipliedBy(10 ** INST_DECIMALS),
      },
    };
    mockTxEvent.filterLog.mockReturnValueOnce([mockInstTransferEvent]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([]);
    expect(mockTxEvent.filterLog).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterLog).toHaveBeenCalledWith(
      TRANSFER_EVENT,
      INST_ADDRESS
    );
  });
});
