import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    fallback: ReactNode;
    children: ReactNode;
}

class ErrorBoundary extends Component<Props> {

    state: { hasError: boolean }

    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error: ErrorInfo) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error({ error, info })
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;