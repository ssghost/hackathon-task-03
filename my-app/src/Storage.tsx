import { err, ok } from 'neverthrow';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Hammer } from 'react-bootstrap-icons';
import { resultFromTruthy } from './Contract';

interface Props {
    canRecv: boolean;
    receive: (value: number) => void;
}

export default function MyStorage(props: Props) {
    const { canRecv, receive } = props;
    const [inputValue, setInputValue] = useState('');
    const [recvValue, setRecvValue] = useState<number>();
    const [validationError, setValidationError] = useState<string>();

    useEffect(() => {
        const [ivalue, error] = resultFromTruthy(inputValue, undefined)
            .andThen((input: any) => {
                const amount = Number(input);
                return Number.isNaN(ivalue)) ? err('invalid input') : ok(ivalue);
            })
            .match<[bigint?, string?]>(
                (a: any) => [BigInt(Math.round(a * 1e6)), undefined],
                (e: any) => [undefined, e]
            );
        setDepositAmount(amount);
        setValidationError(error);
    }, [depositInput]);

    const handleSubmitDeposit = useCallback(() => {
        console.log(`Attempting to deposit ${depositAmount} uCCD.`);
        if (depositAmount) {
            deposit(depositAmount);
            setDepositInput('');
        }
    }, [depositAmount, deposit]);
    return (
        <Row>
            <Form.Group as={Col} md={8}>
                <InputGroup className="mb-3" hasValidation>
                    <InputGroup.Text id="basic-addon1">CCD</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Amount to deposit"
                        value={depositInput}
                        onChange={(e) => setDepositInput(e.target.value)}
                        isInvalid={Boolean(validationError)}
                    />
                    <Button variant="primary" onClick={handleSubmitDeposit} disabled={!canDeposit || !depositAmount}>
                        Deposit
                    </Button>
                    <Form.Control.Feedback type="invalid">{validationError}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md={4}>
                <Button variant="danger" className="w-100" onClick={smash} disabled={!canSmash}>
                    <Hammer />
                </Button>
            </Form.Group>
        </Row>
    );
}